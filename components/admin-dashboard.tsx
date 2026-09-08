"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Concert, AudioTrack, Taxonomies } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import { detectVideo, slugify } from "@/lib/concert-utils";

type Draft = Partial<Concert> & { audio_tracks: AudioTrack[] };

const EMPTY: Draft = {
  title: "",
  slug: "",
  description: "",
  video_type: "none",
  video_url: "",
  video_id: "",
  thumbnail_url: "",
  duration: "",
  release_date: "",
  composers: [],
  instruments: [],
  periods: [],
  nationalities: [],
  qualities: [],
  performers: [],
  categories: [],
  audio_tracks: [],
  published: true,
};

const TAG_FIELDS: { key: keyof Concert; label: string; tax: keyof Taxonomies }[] =
  [
    { key: "composers", label: "Composers", tax: "composers" },
    { key: "performers", label: "Performers", tax: "performers" },
    { key: "instruments", label: "Instrumentation", tax: "instruments" },
    { key: "periods", label: "Period", tax: "periods" },
    { key: "nationalities", label: "Nationality", tax: "nationalities" },
    { key: "qualities", label: "Quality", tax: "qualities" },
  ];

export function AdminDashboard({ taxonomies }: { taxonomies: Taxonomies }) {
  const supabase = useMemo(() => createClient(), []);
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("concerts")
      .select("*")
      .order("release_date", { ascending: false });
    setConcerts((data as Concert[]) ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    load();
  }, [load]);

  async function save() {
    if (!draft?.title) {
      setError("Title is required.");
      return;
    }
    setSaving(true);
    setError(null);
    const row = {
      ...draft,
      slug: draft.slug || slugify(draft.title),
    };
    const { error } = await supabase
      .from("concerts")
      .upsert(row, { onConflict: "slug" });
    setSaving(false);
    if (error) {
      setError(error.message);
      return;
    }
    setDraft(null);
    load();
  }

  async function remove(slug: string) {
    if (!confirm("Delete this concert? This cannot be undone.")) return;
    await supabase.from("concerts").delete().eq("slug", slug);
    load();
  }

  // ---- Form ----
  if (draft) {
    const set = (patch: Partial<Draft>) =>
      setDraft((d) => ({ ...(d as Draft), ...patch }));

    return (
      <div className="px-4 pb-24 pt-6">
        <button
          onClick={() => setDraft(null)}
          className="mb-4 text-sm text-gold"
        >
          ← Back to list
        </button>
        <h1 className="px-1 text-[28px] font-bold text-white">
          {draft.wp_id || draft.slug ? "Edit concert" : "New concert"}
        </h1>

        <div className="mt-6 space-y-5">
          <Field label="Title">
            <input
              className={inputCls}
              value={draft.title ?? ""}
              onChange={(e) =>
                set({
                  title: e.target.value,
                  slug: draft.slug || slugify(e.target.value),
                })
              }
            />
          </Field>

          <Field label="Slug (URL)">
            <input
              className={inputCls}
              value={draft.slug ?? ""}
              onChange={(e) => set({ slug: slugify(e.target.value) })}
            />
          </Field>

          <Field label="Video / audio URL (YouTube, Vimeo, Bunny .m3u8, mp3…)">
            <input
              className={inputCls}
              value={draft.video_url ?? ""}
              placeholder="Paste a link — the type is detected automatically"
              onChange={(e) => {
                const url = e.target.value;
                const d = detectVideo(url);
                set({
                  video_url: url,
                  video_type: d.type as Concert["video_type"],
                  video_id: d.id,
                });
              }}
            />
            <p className="pt-1 text-[11px] text-neutral-500">
              Detected: <span className="text-gold">{draft.video_type}</span>
              {draft.video_id ? ` · id ${draft.video_id}` : ""}
            </p>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Thumbnail URL">
              <input
                className={inputCls}
                value={draft.thumbnail_url ?? ""}
                onChange={(e) => set({ thumbnail_url: e.target.value })}
              />
            </Field>
            <Field label="Duration (e.g. 13 min 23 sec)">
              <input
                className={inputCls}
                value={draft.duration ?? ""}
                onChange={(e) => set({ duration: e.target.value })}
              />
            </Field>
          </div>

          <Field label="Release date (MM/DD/YYYY)">
            <input
              className={inputCls}
              value={draft.release_date ?? ""}
              onChange={(e) => set({ release_date: e.target.value })}
            />
          </Field>

          <Field label="Description">
            <textarea
              rows={5}
              className={inputCls}
              value={draft.description ?? ""}
              onChange={(e) => set({ description: e.target.value })}
            />
          </Field>

          {TAG_FIELDS.map((f) => (
            <TagField
              key={f.key}
              label={f.label}
              values={(draft[f.key] as string[]) ?? []}
              suggestions={taxonomies[f.tax]}
              onChange={(vals) => set({ [f.key]: vals } as Partial<Draft>)}
            />
          ))}

          <AudioTracksEditor
            tracks={draft.audio_tracks}
            onChange={(t) => set({ audio_tracks: t })}
          />

          <label className="flex items-center gap-2 pt-2 text-sm text-neutral-300">
            <input
              type="checkbox"
              checked={!!draft.published}
              onChange={(e) => set({ published: e.target.checked })}
              className="h-4 w-4 accent-[#d9b85e]"
            />
            Published (visible to members)
          </label>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              onClick={save}
              disabled={saving}
              className="bg-gold px-6 py-2.5 text-sm font-semibold text-black disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save concert"}
            </button>
            <button
              onClick={() => setDraft(null)}
              className="border border-white/15 px-6 py-2.5 text-sm text-neutral-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---- List ----
  return (
    <div className="px-4 pb-24 pt-6">
      <div className="flex items-center justify-between px-1">
        <h1 className="text-[34px] font-bold text-white">Editor</h1>
        <button
          onClick={() => setDraft({ ...EMPTY })}
          className="bg-gold px-5 py-2 text-sm font-semibold text-black"
        >
          + Add concert
        </button>
      </div>
      <p className="px-1 pb-4 pt-1 text-[13px] text-neutral-400">
        {concerts.length} concerts · add, edit, and tag the catalog
      </p>

      {loading ? (
        <p className="pt-10 text-center text-neutral-500">Loading…</p>
      ) : (
        <div className="overflow-hidden border border-gold/[0.08] bg-ink-700">
          {concerts.map((c) => (
            <div
              key={c.slug}
              className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3 last:border-0"
            >
              <div className="min-w-0 flex-1">
                <p className="clamp-1 text-[14px] text-white">{c.title}</p>
                <p className="clamp-1 text-[12px] text-neutral-500">
                  {c.composers[0]} · {c.video_type}
                  {c.audio_tracks?.length
                    ? ` · ${c.audio_tracks.length} audio`
                    : ""}
                </p>
              </div>
              {!c.published && (
                <span className="bg-white/10 px-2 py-0.5 text-[10px] text-neutral-400">
                  draft
                </span>
              )}
              <button
                onClick={() =>
                  setDraft({ ...c, audio_tracks: c.audio_tracks ?? [] })
                }
                className="text-[13px] text-gold"
              >
                Edit
              </button>
              <button
                onClick={() => remove(c.slug)}
                className="text-[13px] text-red-400/80"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const inputCls =
  "w-full  border border-white/10 bg-ink-800 px-3 py-2.5 text-[14px] text-white outline-none focus:border-gold/50";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs uppercase tracking-wide text-neutral-500">
        {label}
      </label>
      {children}
    </div>
  );
}

function TagField({
  label,
  values,
  suggestions,
  onChange,
}: {
  label: string;
  values: string[];
  suggestions: string[];
  onChange: (v: string[]) => void;
}) {
  const [text, setText] = useState("");
  const listId = `tags-${label.replace(/\s/g, "")}`;

  // Add one or more tags (comma-separated). New tags are always allowed —
  // suggestions are only autocomplete, never a restriction.
  function add(raw: string) {
    const parts = raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (parts.length) {
      const next = [...values];
      for (const p of parts) {
        if (!next.some((x) => x.toLowerCase() === p.toLowerCase())) next.push(p);
      }
      onChange(next);
    }
    setText("");
  }

  // Existing tags across the whole catalog that this concert doesn't have yet —
  // one tap to reuse them.
  const quick = suggestions
    .filter((s) => !values.some((v) => v.toLowerCase() === s.toLowerCase()))
    .slice(0, 12);

  return (
    <div>
      <label className="mb-1 block text-xs uppercase tracking-wide text-neutral-500">
        {label}
      </label>

      {/* Selected tags */}
      {values.length > 0 && (
        <div className="flex flex-wrap gap-2 pb-2">
          {values.map((v) => (
            <span
              key={v}
              className="flex items-center gap-1 bg-gold/15 px-3 py-1 text-[12px] text-gold"
            >
              {v}
              <button
                type="button"
                onClick={() => onChange(values.filter((x) => x !== v))}
                className="text-gold/70"
                aria-label={`Remove ${v}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Input + explicit Add button — type anything new, or pick a suggestion */}
      <div className="flex gap-2">
        <input
          list={listId}
          className={inputCls + " flex-1"}
          value={text}
          placeholder="Add a tag — new or existing"
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              add(text);
            }
          }}
          onBlur={() => text && add(text)}
        />
        <button
          type="button"
          onClick={() => add(text)}
          className="shrink-0 border border-gold/40 px-4 text-sm text-gold"
        >
          Add
        </button>
      </div>
      <datalist id={listId}>
        {suggestions.map((s) => (
          <option key={s} value={s} />
        ))}
      </datalist>

      {/* One-tap reuse of existing tags */}
      {quick.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-2">
          {quick.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => add(s)}
              className="border border-white/10 px-2.5 py-0.5 text-[11px] text-neutral-400 hover:border-gold/40 hover:text-gold"
            >
              + {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function AudioTracksEditor({
  tracks,
  onChange,
}: {
  tracks: AudioTrack[];
  onChange: (t: AudioTrack[]) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs uppercase tracking-wide text-neutral-500">
        Audio tracks (optional — enables the Lossless Audio player)
      </label>
      <div className="space-y-2">
        {tracks.map((t, i) => (
          <div key={i} className="flex gap-2">
            <input
              className={inputCls + " flex-1"}
              placeholder="Track title"
              value={t.title}
              onChange={(e) => {
                const next = [...tracks];
                next[i] = { ...next[i], title: e.target.value };
                onChange(next);
              }}
            />
            <input
              className={inputCls + " flex-[2]"}
              placeholder="Audio URL (.mp3 / .wav)"
              value={t.url}
              onChange={(e) => {
                const next = [...tracks];
                next[i] = { ...next[i], url: e.target.value };
                onChange(next);
              }}
            />
            <button
              onClick={() => onChange(tracks.filter((_, j) => j !== i))}
              className="px-2 text-red-400/80"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={() => onChange([...tracks, { title: "", url: "" }])}
        className="mt-2 text-[13px] text-gold"
      >
        + Add track
      </button>
    </div>
  );
}
