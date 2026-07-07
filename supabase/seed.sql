-- Seed the concerts catalog (generated from data/concerts.json).
-- Run AFTER supabase/schema.sql. Safe to re-run: upserts on slug.

insert into public.concerts (wp_id, slug, title, description, video_type, video_url, video_id, thumbnail_url, duration, release_date, original_link, composers, instruments, periods, nationalities, qualities, performers, categories, published)
values
  (1225, 'piano-quartet-in-a-minor', 'Piano Quartet in A minor', 'The Piano Quartet in A minor, or more exactly the Quartet Movement for Piano, Violin, Viola and Cello in A Minor, by Gustav Mahler is the first movement to an abandoned piano quartet and the composer’s sole surviving piece of instrumental chamber music. Mahler began work on the Piano Quartet in A minor towards the end of his first year at the Vienna Conservatory, when he was around 15 or 16 years of age. The piece had its first performance on July 10, 1876, at the conservatory with Mahler at the piano, but it is unclear from surviving documentation whether the quartet was complete at this time. In several letters, Mahler mentions a quartet or quintet, but there is no clear reference to this piano quartet. 



Following this performance the work was performed at the home of Dr. Theodor Billroth, who was a close friend of Johannes Brahms. The final known performance of the Quartet in the 19th century was at Iglau on September 12, 1876, with Mahler again at the piano; it was performed along with a violin sonata by Mahler that has not survived. It appears that at one point Mahler wished to publish the Quartet, as the surviving manuscript, which includes 24 bars of a scherzo for piano quartet written in G minor, bears the stamp of the publisher Theodor Rättig. Following the rediscovery of the manuscript by Mahler’s widow Alma Mahler in the 1960s, the work was premiered in the United States on February 12, 1964, at the Philharmonic Hall in New York City by Peter Serkin and the Galimir Quartet. Four years later it was performed in the United Kingdom on June 1, 1968, at the Purcell Room, London, by the Nemet Ensemble.', 'hls', 'https://vz-a6a9f576-8c5.b-cdn.net/fc098347-380b-44f3-a430-503c50b2c38e/playlist.m3u8', '', 'https://play.creartbox.nyc/wp-content/uploads/2022/01/IMG_1280.jpg', '13 min 23 sec', '12/05/2021', 'https://play.creartbox.nyc/title/piano-quartet-in-a-minor/', ARRAY['Gustav Mahler']::text[], ARRAY['Cello','Piano','Viola','Violin']::text[], ARRAY['20th Century']::text[], ARRAY['European']::text[], ARRAY['HD video']::text[], ARRAY['Josefina Urraca, piano','Keir GoGwilt, violin','Matthew Cohen, viola','Yi Qun Xu, cello']::text[], ARRAY[]::text[], false),
  (1240, 'prelude-recitatif-et-variations', 'Prelude Recitatif et variations', 'Maurice Duruflé was a French composer, organist and teacher who was little known in his lifetime but has won many admirers in recent years. An introspective and highly self-critical musician, he published only 14 works, and often continued to edit and change pieces after publication. Today he is known mainly for his Requiem and a handful of short organ and choral pieces composed for church performance.

After graduation from the Paris Conservatoire, he was named assistant organist at the Notre Dame cathedral in Paris. In 1929, he became organist at the church of Saint Etienne du Mont, which contains the shrine of St. Genevieve, the patron saint of Paris, and the tombs of Pascal and Racine. Duruflé held that position for the rest of his life, premiering Francis Poulenc’s Organ Concerto, and in 1943, adding the position of professor of harmony at the Conservatoire.

Despite the fact that Duruflé lived into his eighties, his list of works is quite brief. Strong self-criticism and doubts as to his compositional abilities kept him from writing more than a handful of works, most of them for organ or choir. His surprising self-effacement was not due to a lack of recognition or talent, for he won several prizes both for his organ playing and his compositions, and his works are of a consistently high quality, revealing a mastery of harmonic color, counterpoint, and formal clarity.

Duruflé’s Prélude, Récitatif et Variations for flute, viola, and piano is a rare example of the composer’s instrumental chamber music. He wrote the work in 1928 and dedicated it to the memory of the well-known French publisher and contemporary music enthusiast Jacques Durand, who had died in August of that year.

The Prélude, marked lent et triste (“Slow and sad”), begins quietly. After building to an impassioned climax, the piano’s cascading arpeggios settle down and give way to the Récitative (a style of “singing speech,” borrowed from opera and sacred music), a dialogue between the viola and flute. The ensuing theme, intoned by the flute with a spare accompaniment in the piano, demonstrates Duruflé’s interest in medieval plainchant, which serves as the basis for the Variations that conclude the work.', 'youtube', '8yoCg0Hfb54', '8yoCg0Hfb54', 'https://play.creartbox.nyc/wp-content/uploads/2022/01/09.jpg', '10 min 54 sec', '08/11/2013', 'https://play.creartbox.nyc/title/prelude-recitatif-et-variations/', ARRAY['Maurice Durufle']::text[], ARRAY['Flute','Piano','Viola']::text[], ARRAY['20th Century']::text[], ARRAY['European']::text[], ARRAY['HD video']::text[], ARRAY['Guillermo Laporta, flute','Josefina Urraca, piano','Nathan Schram, viola']::text[], ARRAY[]::text[], false),
  (1282, 'second-violin-chaconne', 'Second Violin Chaconne', 'This is the fifth movement of the Partita in D minor for solo violin (BWV 1004) by Johann Sebastian Bach was written between 1717 and 1720. It is a part of his compositional cycle called Sonatas and Partitas for Solo Violin.

Brahms, in a letter to Clara Schumann in June 1877, said about the ciaccona: The Chaconne is for me one of the most wonderful, incomprehensible pieces of music. On one stave, for a small instrument, the man writes a whole world of the deepest thoughts and most powerful feelings. If I imagined that I could have created, even conceived the piece, I am quite certain that the excess of excitement and earth-shattering experience would have driven me out of my mind.

This project was developed as part of the “CreArt Music Festival Web Experience Edition”. CreArtBox explored how to make “a music festival on a website”. With visual artists and dancers to present an interactive online program based around classical and contemporary repertoire for solo flute, piano, violin, cello, baritone and piano, and flute and piano.

Explore the festival here.', 'vimeo', '537780913', '537780913', 'https://play.creartbox.nyc/wp-content/uploads/Screen-Shot-2022-01-29-at-2.05.46-PM-scaled.jpg', '14 min 33 sec', '05/15/2021', '', ARRAY['J.S. Bach']::text[], ARRAY['Violin']::text[], ARRAY['18th Century']::text[], ARRAY['European']::text[], ARRAY['HD video']::text[], ARRAY['Mari Lee, violin']::text[], ARRAY[]::text[], false),
  (1284, 'sonata-kv-283-ii-mov', 'Sonata KV.283 II mov', 'W.A.Mozart was about 17 years old when he traveled to Munich with his father for the premiere of his opera “La finta giardiniera”. He took 5 keyboard sonatas with him, and wrote a 6th one while being there, the so-called ‘Munich sonatas’, KV 279-284. This sonata is part of the earliest group of sonatas that Mozart published in the mid-1770s.', 'vimeo', '537812370', '537812370', 'https://play.creartbox.nyc/wp-content/uploads/2022/01/Screen-Shot-2022-01-15-at-9.27.45-AM.jpg', '6 min 25 sec', '05/15/2021', '', ARRAY['Mozart']::text[], ARRAY['Piano']::text[], ARRAY['18th Century']::text[], ARRAY['European']::text[], ARRAY['HD video']::text[], ARRAY['Josefina Urraca, piano','Sarah K. Williams, visual Artist']::text[], ARRAY[]::text[], false),
  (1287, 'third-suite-for-solo-cello', 'Third Suite for solo cello', 'Britten composed the Third Suite in 1971, inspired by Rostropovich''s playing of the unaccompanied Cello Suites of Bach. Rostropovich first performed the suite at the Snape Maltings, 21 December 1974. In 1979 the Britten Estate authorised Julian Lloyd Webber to make the suite''s first recording.
The work incorporates four Russian themes, including three arrangements of folksongs by Pyotr Tchaikovsky, reminiscent of Beethoven''s use of Russian themes in the Razumovsky quartets. The final Russian tune, stated simply at the end of the set, is the Kontakion, the Russian Orthodox Hymn for the Dead. Philip Brett considers the Third Suite to be the most passionate of the three.

This project was developed as part of the "CreArt Music Festival Web Experience Edition". CreArtBox explored how to make "a music festival on a website". With visual artists and dancers to present an interactive online program based around classical and contemporary repertoire for solo flute, piano, violin, cello, baritone and piano, and flute and piano.

Explore the festival here.', 'vimeo', '542211232', '542211232', 'https://play.creartbox.nyc/wp-content/uploads/2022/01/britten.jpg', '4 min 15 sec', '05/11/2021', '', ARRAY['Benjamin Britten']::text[], ARRAY['Cello','Dance']::text[], ARRAY['20th Century']::text[], ARRAY['European']::text[], ARRAY['HD video']::text[], ARRAY['Hsiao-Chu Hsia, dancer','Julia Yang, cello']::text[], ARRAY[]::text[], false),
  (1291, 'quartet-twv-43-g4', 'Quartet TWV 43 g4', 'Georg Philipp Telemann was a German Baroque composer and multi-instrumentalist. Almost completely self-taught in music, he became a composer against his family’s wishes.
Telemann referred to these quartets as “quadros,” indicating that they had four parts. The more sonata-like quadri treated the three upper voices fairly equally. Other quadros were more concerto-like, in that one of the voices – in this case, usually the transverse flute or the recorder – was more prominent. In fact, sometimes these quadros are actually referred to as concertos. In both cases, the bottom voice plays a role analogous to that of the basso continuo. Examples of both are included here. All of the quadros are in three or four movements.

Telemann’s chamber music is historically unique in its range of instrumental settings. From his huge output these new editions present the six quartets for Flute, Violin, Viola da Gamba or Violoncello and BassoContinuo that he wrote in Paris in the 1730s.

Published with the title Nouveaux Quatuors en Six Suites by Le Clerc in Paris in 1738, these pieces are suites with various sequences of movements, each introduced byaprelude.

Here Telemann shows himself committed to the French style. The works are of special interest not only for their high quality but also because of the variable scoring of the third part for Viola da Gamba orVioloncello.', 'vimeo', '671506323', '671506323', 'https://play.creartbox.nyc/wp-content/uploads/2022/01/003-2.jpg', '7 min 22 sec', '12/05/2021', '', ARRAY['G. P. Telemann']::text[], ARRAY['Cello','Flute','Piano','Viola','Violin']::text[], ARRAY['17th Century','18th Century']::text[], ARRAY['European']::text[], ARRAY['HD video']::text[], ARRAY['Guillermo Laporta, flute','Josefina Urraca, piano','Keir GoGwilt, violin','Matthew Cohen, viola','Yi Qun Xu, cello']::text[], ARRAY[]::text[], false),
  (1301, 'luciform', 'Luciform', 'Mario Diaz de Leon is an acclaimed composer and performer, whose work encompasses modern classical music, experimental electronic music, extreme metal, and creative improvised music. Luciform is part 4 of the “Mansion Cycle” (2009-2011), and the third work in “Cosmology”, an ongoing series of works for solo performer and electronics. Luciform is a concerto for flute and electronic music. Latin lux, lucis (light) + form, “light-form” Lucifer “light-bearer”, “the morning star”. Seeking illumination through transgression of boundaries. Luciform is a journey inward, a movement through a series of vision states. A difficult path, a rite of passage, hovering between diabolical intensity and lucid wakefulness.', 'vimeo', '', '', 'https://play.creartbox.nyc/wp-content/uploads/IMG_1065.jpg', '', '12/02/2021', '', ARRAY['M. Diaz de Leon']::text[], ARRAY['Flute']::text[], ARRAY['21st Century']::text[], ARRAY['American']::text[], ARRAY['HD video']::text[], ARRAY['Guillermo Laporta, flute','Marieken Cochius, painter']::text[], ARRAY[]::text[], false),
  (1428, 'just-as-they-are', 'Just As They Are', 'CreArtBox performed Just As They Are by Anna Clyne as part of the first edition of the CreArt Music Festival. London-born Anna Clyne is a GRAMMY-nominated composer of acoustic and electro-acoustic music. Described as a “composer of uncommon gifts and unusual methods” in a New York Times profile and as “fearless” by NPR, Clyne is one of the most acclaimed and in-demand composers of her generation, often embarking on collaborations with innovative choreographers, visual artists, filmmakers, and musicians.', 'audio', 'https://play.creartbox.nyc/wp-content/uploads/Just-as-they-are.mp3', '', 'https://play.creartbox.nyc/wp-content/uploads/030-1.jpg', '5 in 23 sec', '', '', ARRAY[]::text[], ARRAY['Cello','Clarinet','Electronics','Flute','Piano']::text[], ARRAY['21st Century']::text[], ARRAY['American']::text[], ARRAY['Lossless audio']::text[], ARRAY['Guillermo Laporta, flute','Johnna Wu, violin','Josefina Urraca, piano','Julia Yang, cello','Nicholas Gallas, clarinet']::text[], ARRAY[]::text[], false),
  (1449, 'coming-together', 'Coming Together', 'Coming Together
      Frederic Rzewski · CreArtBox
    
    
  

  
    0:00
    
      
    
    0:00
  

  
    
      
        
        
      
    

    
      
        
      
      
        
      
    

    
      
        
        
      
    
  

  
    Coming Together', 'audio', '', '', 'https://play.creartbox.nyc/wp-content/uploads/004-1.jpg', '12 min 22 sec', '05/21/2014', '', ARRAY['Frederic Rzewski']::text[], ARRAY['Actor','Cello','Clarinet','Electronics','Flute','Piano','Violin']::text[], ARRAY['21st Century']::text[], ARRAY['American']::text[], ARRAY['Lossless audio']::text[], ARRAY['Doori Na, violin','Guillermo Laporta, flute','Josefina Urraca, piano','Rick Cekovsky, actor','Tagore Gonzalez, clarinet','Yves Dharamraj, cello']::text[], ARRAY[]::text[], false),
  (1472, 'the-old-castle', 'The Old Castle', 'Stasov''s comment: "A medieval castle before which a troubadour sings a song."

This movement is thought to be based on a watercolor depiction of an Italian castle and is portrayed in Ravel''s orchestration by a bassoon and alto saxophone duet. Hartmann often placed appropriate human figures in his architectural renderings to suggest scale.

Pictures at an Exhibition is a suite of ten piano pieces, plus a recurring, varied Promenade theme, composed by Russian composer Modest Mussorgsky in 1874. The piece is Mussorgsky''s most famous piano composition, and it has become a showpiece for virtuoso pianists. It became further widely known through various orchestrations and arrangements produced by other composers and musicians, with Maurice Ravel''s 1922 adaptation for full symphony orchestra being the most recorded and performed.', 'vimeo', '667030044', '667030044', 'https://play.creartbox.nyc/wp-content/uploads/18.jpg', '4 min 42 sec', '08/11/2013', '', ARRAY['Modest Mussorgsky']::text[], ARRAY['Cello','Dance','Piano','Viola']::text[], ARRAY['19th Century','20th Century']::text[], ARRAY[]::text[], ARRAY['HD video']::text[], ARRAY['Josefina Urraca, piano','Nathan Schram, viola','Yung-Li Chen, dancer','Yves Dharamraj, cello']::text[], ARRAY[]::text[], false),
  (1474, 'eclipse', 'Eclipse', 'During a position as a resident composer of the cultural and artistic company Cre.Art Project, Marcos wrote «Noctum», a chamber opera whose overture “Eclipse” preludes a story full of magic and fantasy where dreams and reality meet.

Following the premiere of this chamber opera, over 30 successful re-interpretations of its overture “Eclipse” in USA and Spain incentivised the creation of a newer and expanded version for orchestra of such overture, which will premiere on:', 'vimeo', '667029352', '667029352', 'https://play.creartbox.nyc/wp-content/uploads/07.jpg', '', '08/11/2013', '', ARRAY['Marcos Fernandez']::text[], ARRAY['Cello','Flute','Piano','Viola']::text[], ARRAY['21st Century']::text[], ARRAY[]::text[], ARRAY['HD video']::text[], ARRAY['Guillermo Laporta, flute','Josefina Urraca, piano','Nathan Schram, viola','Yves Dharamraj, cello']::text[], ARRAY[]::text[], false),
  (524, 'spiegel-im-spiegel', 'Spiegel im Spiegel', 'Spiegel im Spiegel is a composition by Arvo Pärt written in 1978, just before his departure from Estonia. The piece is in the tintinnabular style, wherein a melodic voice, operating over diatonic scales, and tintinnabular voice, operating within a triad on the tonic, accompany each other.

The structure of the piece follows a strict formula, where no note is left to chance. The title directly reflects what is happening in the music: each ascending melodic line is followed by a descending mirror phrase. Initially, the melody consists of only two notes, with another note being added with each of the following phrases, thus creating a seemingly endless continuum. After each distancing, the melody returns to the central pitch of A, which, according to the composer, is like “returning home after being away”. The piano part accompanies the melody part at each step like a “guardian angel”, as the composer himself likes to say. In addition to the accompaniment, the piano part includes tintinnabuli notes – like little bells that alternately sound above and below the melodic line, following a fixed formula.

This seemingly simple composition poses a great challenge to a musician in bringing the music alive during the performance. The composer believes that first and foremost, the musician has to have something to say to himself or herself and to others: “Everything redundant must be left aside. Just like the composer has to reduce his ego when writing the music, the musician too must put his ego aside when performing the piece.” Purity and innocence are the qualities valued by the composer in the performance of his music.', 'hls', 'https://vz-a6a9f576-8c5.b-cdn.net/b87968d6-f21b-4f09-a673-531c1903dcfc/playlist.m3u8', '', 'https://play.creartbox.nyc/wp-content/uploads/2021/08/IMG_1240-scaled.jpg', '9 min 23 sec', '12/04/2021', 'https://play.creartbox.nyc/title/grand-tour/', ARRAY['Arvo Pärt']::text[], ARRAY['Dance','Piano','Violin']::text[], ARRAY['21st Century']::text[], ARRAY[]::text[], ARRAY['HD video']::text[], ARRAY['Josefina Urraca, piano','Keir GoGwilt, violin','Mary Taylor Hennings, dancer','Yi Qun Xu, cello']::text[], ARRAY[]::text[], true),
  (702, '12-queens-preludes', '12 Queens Preludes', 'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type.', 'hls', 'https://vz-a6a9f576-8c5.b-cdn.net/548596d7-a8ab-4c8e-84ea-bd2e1a028285/playlist.m3u8', '', 'https://play.creartbox.nyc/wp-content/uploads/DSC00857.jpg', '44 min 15 sec', '10/16/2021', 'https://play.creartbox.nyc/title/queens-preludes/', ARRAY['Guillermo Laporta']::text[], ARRAY['Flute','Piano']::text[], ARRAY['21st Century']::text[], ARRAY['American']::text[], ARRAY['HD video']::text[], ARRAY['Guillermo Laporta, flute','Josefina Urraca, piano']::text[], ARRAY[]::text[], true),
  (1257, 'mandalas-in-the-rubble', 'Mandalas in the Rubble', 'While I was in Nepal, I witnessed that most of the temples are constructed on a series of concentric circles or squares with a broad base and numerous tops that gradually narrow. Unfortunately, the country was devastated by an earthquake in 2015. As a result, many of the Kathmandu Valley’s historic monuments, buildings and temples were collapsed into debris, yet the mandala-shaped bases of both structures remained intact.

Many Nepalis consider these temples to be the most special places on earth as their presence in these structures is what allows them to communicate with their guiding goddesses and gods. What really struck me and went far beyond my own understanding was witnessing Nepali people coming to sit on the collapsed debris every night——they came to the portals where Heaven touches the earth for worship, as they do every day, with genuine smiles and hope from the bottom of their hearts. Nepali deeply rooted in their being. The peace inside them passeth all understanding.

In Mandalas in the Rubble, I wanted to create a free-flowing soundscape that maintaining a sporadic texture throughout the piece, yet it gradually evolves into a peaceful non-violent cohesiveness. In Mandalas in the Rubble, the instruments are not being played as they are expected to or used to. For instance, the violin and cello are partly detuned in order to create a “ramshackle and dark” effect with the tension of the strings. It is meant to symbolize how shattered and fragmentized thing has a way of turning themselves into strength and beauty without losing their natural being. One could think of the mandalas as blooming in the rubble.

– Dai Wei', 'hls', 'https://vz-a6a9f576-8c5.b-cdn.net/ca51ef42-2e34-4fc6-be69-e01f96bbfc32/playlist.m3u8', '', 'https://play.creartbox.nyc/wp-content/uploads/2022/01/004.jpg', '7 min 59 sec', '08/31/2019', 'https://play.creartbox.nyc/title/mandalas-in-the-rubble', ARRAY['Dai Wei']::text[], ARRAY['Cello','Clarinet','Piano','Viola']::text[], ARRAY['21st Century']::text[], ARRAY['American']::text[], ARRAY['Lossless audio']::text[], ARRAY['Jonathan Cohen, clarinet','Josefina Urraca, piano','Julia Yang, cello','Mari Lee, violin']::text[], ARRAY[]::text[], true),
  (1289, 'legende', 'Legende', 'Legende by Henriette Renie (1875-1956) has endured in the harp’s repertoire as one of Renie’s most popular and demanding works. It is a programmatic work, inspired by the poem “Les Elfes” by the French poet Charles- Marie-Rene Leconte de Lisle (1818-1894), who was closely associated with the Parnassian movement in poetry.

It was written in 1901 and first performed in 1902. Renie dedicated the piece to “my dear Master Mr. Theodore Dubois, Member of the Institute and Director of the National Conservatory of Music,” who was director of the Paris Conservatory at the time and a good friend. Renie premiered Dubois’ Fantasie for harp and orchestra in 1905.', 'hls', 'https://vz-a6a9f576-8c5.b-cdn.net/64de021c-2d12-4318-b21b-7ee6851d53ee/playlist.m3u8', '', 'https://play.creartbox.nyc/wp-content/uploads/2022/01/Screen-Shot-2022-01-15-at-9.34.18-AM-scaled.jpg', '10 min 49 sec', '12/05/2021', '', ARRAY['Henriette Renie']::text[], ARRAY['Harp']::text[], ARRAY['20th Century']::text[], ARRAY['European']::text[], ARRAY['HD video']::text[], ARRAY['Jane Yoon, harp']::text[], ARRAY[]::text[], true),
  (1293, 'petite-suite', 'Petite Suite', 'Download MP3 
I. Prélude. Modéré
II. Modéré sans traîner
III. Vivement
IV. Allant
V. (Without title)
This work was originally composed to be the stage music for the play Aimer sans savoir qui by Lope de Vega, directed by Jean Vilar. As the play never got performed, the piece was created in 1943 for Radio Paris instead, and published only after the composer’s death. Jolivet himself wrote a few words about his work, enabling us to picture the action supposed to happen on stage:
‘The Prélude follows the daydreams of a sentimental young woman rocking in a hammock on a heady spring evening. The Modéré develops the impression of being in the open given by the Prélude. The Vif joins Spanish rhythms to fleeing semiquavers, emulating the playful chases of a young couple in love. The Allant unfolds a tender dialogue and expresses all of its gentle affection, whereas the contrasting final movement exposes the ironic and burlesque point of view of the traditional comedy footman, amused by all these sentimental affairs.’', 'hls', 'https://vz-a6a9f576-8c5.b-cdn.net/9aab96b2-bdda-4546-8470-e4754e8d6935/playlist.m3u8', '', 'https://play.creartbox.nyc/wp-content/uploads/IMG_1046-1.jpg', '4 min 49 sec', '12/02/2021', '', ARRAY['Andre Jolivet']::text[], ARRAY['Flute','Harp','Viola']::text[], ARRAY['20th Century']::text[], ARRAY['European']::text[], ARRAY['HD video']::text[], ARRAY['Guillermo Laporta, flute','Jane Yoon, harp','Matthew Cohen, viola']::text[], ARRAY[]::text[], true),
  (1326, 'fourth-symphony', 'Fourth Symphony', 'The Symphony No. 4 in G major by Gustav Mahler was composed from 1899 to 1900, though it incorporates a song originally written in 1892. That song, "Das himmlische Leben", presents a child''s vision of heaven and is sung by a soprano in the symphony''s Finale. Both smaller in orchestration and shorter in length than Mahler''s earlier symphonies, the Fourth Symphony was initially planned to be in six movements, alternating between three instrumental and three vocal movements. The symphony''s final form—begun in July 1899 at Bad Aussee and completed in August 1900 at Maiernigg—retains only one vocal movement (the Finale) and is in four movements: Bedächtig, nicht eilen (sonata form); In gemächlicher Bewegung, ohne Hast (scherzo and trio); Ruhevoll, poco adagio (double theme and variations); and Sehr behaglich (strophic variations).', 'hls', 'https://vz-a6a9f576-8c5.b-cdn.net/eedb7a24-f2b4-44ef-932a-ad8d11633aaf/playlist.m3u8', '', 'https://play.creartbox.nyc/wp-content/uploads/19.jpg', '58 min 15 sec', '03/30/2018', '', ARRAY['Gustav Mahler']::text[], ARRAY['Chamber orchestra']::text[], ARRAY['19th Century']::text[], ARRAY[]::text[], ARRAY['HD video']::text[], ARRAY['CreArtBox Ensemble','Le Train Bleu Ensemble','Ranson Wilson, conductor']::text[], ARRAY[]::text[], true),
  (1330, 'piano-trio-no-1-op-49', 'Piano Trio No.1, Op.49', 'II. Andante con molto tranquillo 

This Trio op. 49 for violin, violoncello and piano was composed in 1839. In a letter dated March 21, 1840 to Ignaz Moscheles, Mendelssohn mentioned an inquiry by the publisher Ewer in London to arrange this trio for flute instead of violin. It is assumed that Mendelssohn either arranged the trio accordingly or at least authorised such an arrangement. Transforming the violin part into a flute part is quite astounding and was handled so freely and ingeniously in a variety of aspects that we can only assume that the composer himself could dare to come up with the solutions in question. Interesting information as to the history and development of this edition is given in the preface.', 'hls', 'https://vz-a6a9f576-8c5.b-cdn.net/ee1683d9-17df-4458-aa7f-443332cbe288/playlist.m3u8', '', 'https://play.creartbox.nyc/wp-content/uploads/019.jpg', '6 min 53 sec', '03/30/2022', '', ARRAY['Felix Mendelssohn']::text[], ARRAY['Cello','Flute','Piano']::text[], ARRAY['19th Century']::text[], ARRAY['European']::text[], ARRAY['HD video']::text[], ARRAY['Guillermo Laporta, flute','Josefina Urraca, piano','Julia Yang, cello']::text[], ARRAY[]::text[], true),
  (1419, 'mariri', 'Mariri', 'Not playing
      Mariri · Joshua Penman
    
    
  

  
    0:00
    
      
    
    0:00
  

  
    
      
        
        
      
    

    
      
        
      
      
        
      
    

    
      
        
        
      
    
  

  
    Mariri', 'none', '', '', 'https://play.creartbox.nyc/wp-content/uploads/313.jpg', '11 min 33 sec', '12/03/2016', '', ARRAY['Joshua Penman']::text[], ARRAY['Cello','Clarinet','Electronics','Flute','Piano','Violin']::text[], ARRAY['21st Century']::text[], ARRAY['American']::text[], ARRAY['Lossless audio']::text[], ARRAY['Clara Vazquez, violin','Guillermo Laporta, flute','Josefina Urraca, piano','Mindi Asher, cello','Nicholas Gallas, clarinet']::text[], ARRAY[]::text[], true),
  (1420, 'petroushkates', 'Petroushkates', 'Not playing
      Petroushskates · Joan Tower
    
    
  

  
    0:00
    
      
    
    0:00
  

  
    
      
        
        
      
    

    
      
        
      
      
        
      
    

    
      
        
        
      
    
  

  
    Petroushskates
    
  



The title Petroushskates combines two ideas that are related to this piece. One refers to Stravinsky’s Petroushka and the opening Shrovetide Fair scene which is very similar to the opening of my piece. The celebratory character and the busy colorful atmosphere of this fair provides one of the images for this piece. The other is associated with ice skating and the basic kind of flowing motion that is inherent to that sport. While watching the figure skating event at the recent winter Olympics, I became fascinated with the way the curving, twirling, and jumping figure are woven around a singular continuous flowing action. Combining these two ideas creates a kind of carnival on ice – a possible subtitle for this piece. 

—Joan Tower', 'audio', '', '', 'https://play.creartbox.nyc/wp-content/uploads/016.jpg', '6 min 10 sec', '03/13/2015', '', ARRAY['Joan Tower']::text[], ARRAY['Cello','Clarinet','Flute','Piano','Violin']::text[], ARRAY['21st Century']::text[], ARRAY['American']::text[], ARRAY['Lossless audio']::text[], ARRAY['Anton Rist, clarinet','Guillermo Laporta, flute','Josefina Urraca, piano','Keir GoGwilt, violin','Yves Dharamraj, cello']::text[], ARRAY[]::text[], true),
  (1434, 'three-watercolors', 'Three watercolors', 'II. Soir d''Automne
III. Sérénade

Philippe Gaubert''s Trois Aquarelles imply that these three watercolors will be miniatures or character pieces, but really this is not the case. To the contrary, they are fully developed, substantial movements and he could and perhaps should have simply entitled the work Trio. Gaubert completed them in 1921 and intended them to be played by a standard piano trio, that is, a violin, cello and piano. As an afterthought, he decided that they might also sound well with flute, cello and piano. And surprisingly, it is in this combination that the work became known, although, it is equally effective in both versions. The first part, Par un clair matin (On a clear morning) is cheerful and energetic. The second movement, Soleil, d''automne (Autumn sun) is more subdued and gentle with a touch of melancholy, a kind of elegiac nostalgia for the summer which is gone. The third piece, Sérénade, has a Spanish flavor, or perhaps it is Basque, in the region where Gaubert had a summer home.

Philippe Gaubert (1879-1941) was born in the southern French town of Cahors. He studied flute with Paul Taffanel at the Paris Conservatory and became the leading flautist in France for several decades. He pursued a career as a performer, became conductor of the Paris Opera Orchestra and Professor of Flute at the Paris Conservatory. Not surprisingly, most of his compositions include the flute.', 'vimeo', '666991022', '666991022', 'https://play.creartbox.nyc/wp-content/uploads/026.jpg', '8 min 38 sec', '03/30/2019', 'https://play.creartbox.nyc/title/three-watercolors/', ARRAY['Philippe Gaubert']::text[], ARRAY['Cello','Flute','Piano']::text[], ARRAY['19th Century','20th Century']::text[], ARRAY['European']::text[], ARRAY['HD video']::text[], ARRAY['Guillermo Laporta, flute','Josefina Urraca, piano','Julia Yang, cello']::text[], ARRAY[]::text[], true),
  (1435, 'dawnlight', 'Dawnlight', 'Joshua Penman has written music for the films Caravan of Light, a spiritual art film, Deep Down, a feature documentary for PBS, In Destiny’s Hands, a dramatic short, and The Human Machine, a documentary art film.  He is currently writing the score for the feature coming-of-age comedy Sassy Pants (starring Ashley Rickards and Anna Gunn). He has also written music for NIMBUS, an animated television series in development, and commercials for Options XPress and Embracing the World.  He is also signed on to provide scores for the feature horror Lycanthropy, as well as the feature drama Walls of Jericho. He is also producing additional music for the World War II supernatural thriller Panzer 88, directed by Peter Briggs (Hellboy), and produced by Gary Kurtz (Star Wars).
As a concert composer, Joshua Penman has received commissions from the Albany Symphony, New York Youth Symphony, Ann Arbor Symphony, Foundation for Universal Sacred Music, Prism Quartet, Now Ensemble, Arraymusic, Bang on a Can, Lionheart, East Coast Chamber Orchestra, and Nouvel Ensemble Moderne. Additionally, his music has been performed by the Tuscaloosa Symphony, Berkeley Symphony, Fairfax Symphony, Central Washington University Orchestra, University of Wisconsin-Madison Symphony, Reading Symphony, Musica Sacra, Holland Orchestra, University of Michigan Symphony, University of Michigan Symphony Band, Cedar Rapids Symphony, Sangita, String Orchestra of New York City, and American Composers Orchestra. He has won awards for composition from ASCAP, BMI, Columbia and Yale University.
He received doctoral and master’s degrees in composition from the University of Michigan and a bachelor’s degree in music and mathematics from Yale University. In addition, he has studied North Indian classical singing with Sri Devashish Dey and Sundanese gamelan with Pak Nano S. He now lives in Los Angeles, where he is directing his creative energies towards film composition.', 'hls', 'https://vz-a6a9f576-8c5.b-cdn.net/c807cfac-3c2b-498b-950f-efecb34e73ca/playlist.m3u8', '', 'https://play.creartbox.nyc/wp-content/uploads/005.jpg', '12 min 28 sec', '05/18/2017', 'https://play.creartbox.nyc/title/dawnlight/ ‎', ARRAY['Joshua Penman']::text[], ARRAY['Cello','Clarinet','Electronics','Flute','Piano','Violin']::text[], ARRAY['21st Century']::text[], ARRAY['American']::text[], ARRAY['HD video']::text[], ARRAY['Guillermo Laporta, flute','Johnna Wu, violin','Josefina Urraca, piano','Julia Yang, cello','Nicholas Gallas, clarinet']::text[], ARRAY[]::text[], true),
  (1441, 'sonata-in-b-minor', 'Sonata in B minor', 'The Violin Sonata in B minor, P 110, is a sonata for violin and piano by Italian composer Ottorino Respighi, completed in 1917. It is one of Respighi''s major large-scale chamber works.

Respighi''s Violin Sonata was composed in 1917 and is contemporary with one of his major works, Fontane di Roma. It was premiered in Naples on January 20th, 1918 by the violinist Arrigo Serato and the pianist Alessandro Longo. In the same year on the 3rd of March, the piece was performed again with Respighi''s old teacher Federico Sarti with the violin and Respighi himself at the piano. The sonata was dedicated to Ernesto Consolo and Arrigo Serato  and was published by Casa Ricordi in Milan in 1919 and again in 1947, though not without difficulty, as publishers doubted the "performability" of the piece. After its initial publication, the sonata gained international notoriety.

The sonata is divided into three movements and has a duration of around 25 minutes. The movements are untitled, except for the third movement, which is a set of 20 variations on an ostinato-like accompaniment.

The sonata is known for its demanding violin and piano parts and its complex tonal system. Rhythm patterns are also very complex, as time signatures do not always match. For example, the melody in the second movement is first played by the piano in 44, whereas the accompaniment has a time signature of 108.', 'audio', 'https://play.creartbox.nyc/wp-content/uploads/DuoH-Respighi_I-Edit1-161018.wav', '', 'https://play.creartbox.nyc/wp-content/uploads/CD100_out.jpg', '9 min 34 sec', '01/17/2016', '', ARRAY['Ottorino Respighi']::text[], ARRAY['Flute','Piano']::text[], ARRAY['19th Century','20th Century']::text[], ARRAY['European']::text[], ARRAY['Lossless audio']::text[], ARRAY['Guillermo Laporta, flute','Josefina Urraca, piano']::text[], ARRAY[]::text[], true),
  (1442, 'awave', 'Awave', '', 'none', '', '', '', '', '', '', ARRAY[]::text[], ARRAY[]::text[], ARRAY[]::text[], ARRAY['American']::text[], ARRAY[]::text[], ARRAY[]::text[], ARRAY[]::text[], false),
  (1446, 'noctum-concerto', 'Noctum Concerto', 'Not playing
      Marcos Fernández · Noctum Concerto for flute and clarinet
    
    
  

  
    0:00
    
      
    
    0:00
  

  
    
      
        
        
      
    

    
      
        
      
      
        
      
    

    
      
        
        
      
    
  

  
    Noctum Concerto for flute and clarinet
    
  


Born in Barcelona, Marcos is a multidisciplinary composer based in between the cities of Madrid, Barcelona and London and creates original music for a wide array of projects where a plot, script, image, etc. is not enough to tell a story. His very solid music education – a piano degree at ESMUC, a degree in composition at the Royal Conservatoire of Scotland and a Masters in Film Music Composition at the Royal College of Music – has given him the necessary skills to fulfill any audio-visual project.', 'none', '', '', 'https://play.creartbox.nyc/wp-content/uploads/013.jpg', '12 min 10 sec', '05/23/2014', '', ARRAY['Marcos Fernandez']::text[], ARRAY['Cello','Clarinet','Electronics','Flute','Piano','Violin']::text[], ARRAY['21st Century']::text[], ARRAY['European']::text[], ARRAY['Lossless audio']::text[], ARRAY['Doori Na, violin','Guillermo Laporta, flute','Josefina Urraca, piano','Tagore Gonzalez, clarinet','Yves Dharamraj, cello']::text[], ARRAY[]::text[], true),
  (1481, 'sonata-for-clarinet-flute-and-piano', 'Sonata for clarinet, flute and piano', '', 'audio', 'https://play.creartbox.nyc/wp-content/uploads/3.EMMANUEL-3.wav', '', 'https://play.creartbox.nyc/wp-content/uploads/IMG_2667-scaled.jpg', '', '04/02/2011', '', ARRAY[]::text[], ARRAY['Clarinet','Flute','Piano']::text[], ARRAY['20th Century']::text[], ARRAY[]::text[], ARRAY['Lossless audio']::text[], ARRAY['Guillermo Laporta, flute','Marcos Fernandez, piano','Tagore Gonzalez, clarinet']::text[], ARRAY[]::text[], false),
  (1484, 'petite-suite-2', 'Petite Suite', 'The Petite Suite, L 65, is a suite for piano four hands by Claude Debussy. It has been transcribed many times, most notably in an orchestral version by Debussy''s colleague Henri Büsser.

The suite, which was composed from 1886 to 1889, was first performed on 2 February 1889 by Debussy and pianist-publisher Jacques Durand at a salon in Paris.[2] It may have been written due to a request (possibly from Durand) for a piece that would be accessible to skilled amateurs, as its simplicity is in stark contrast with the modernist works that Debussy was writing at the time. 

The work, which lasts about 13 minutes in performance, has four movements:

En bateau (Sailing): Andantino
Cortège (Retinue): Moderato
Menuet: Moderato
Ballet: Allegro giusto

The first two movements are settings of poems from the volume Fêtes galantes by Paul Verlaine (1844–1896).', 'vimeo', '671492590', '671492590', 'https://play.creartbox.nyc/wp-content/uploads/deb.jpg', '14 min 07 sec', '09/01/2018', '', ARRAY['Claude Debussy']::text[], ARRAY['Clarinet','Flute','Piano']::text[], ARRAY['19th Century']::text[], ARRAY['European']::text[], ARRAY['HD video']::text[], ARRAY['Guillermo Laporta, flute','Jonathan Cohen, clarinet','Josefina Urraca, piano']::text[], ARRAY[]::text[], false),
  (1607, 'flashes-and-illuminations', 'Flashes and Illuminations', 'IV Cirque d''hiver
Flashes and Illuminations was commissioned by Reader’s Digest/ Meet the Composer for baritone Sanford Sylvan and pianist David Breitman. Honoring their long musical partnership, I composed a piece that falls equally to pianist and singer, from poets who invite sustained reflection. The title comes, in part, from the “Flashes and Dedications” section of Eugenio Montale’s book La Bufera (The Storm), in which the poem “Sulla Greve” appears (the Greve is a small river near Florence). For Montale, the “flash” is a momentary perception of the natural world or a human interaction that brings sudden insight. Each poem suggested to me a Montalean flash: sudden, muted lightning on the horizon.

– John Harbison', 'none', '', '', 'https://play.creartbox.nyc/wp-content/uploads/004-2.jpg', '3 min 51 sec', '05/15/2021', '', ARRAY['John Harbison']::text[], ARRAY['Voice']::text[], ARRAY['21st Century']::text[], ARRAY['American']::text[], ARRAY['HD video']::text[], ARRAY['Josefina Urraca, piano','Nathaniel Sullivan, baritone','Robert Sirvent, video Artist']::text[], ARRAY[]::text[], false),
  (1798, 'schumanop73', 'Fantasy Pieces for viola & piano Op.73', 'Though they were originally intended for clarinet and piano, Schumann indicated that the clarinet part could also be performed on viola or cello. Robert Schumann wrote the pieces in just two days in February 1849, and originally titled them “Soirée Pieces” (Night Pieces) before settling on the title Fantasiestücke. The title is one Schumann was clearly fond of, since he used it for several works. This poetic title speaks to the fundamental Romantic notion that creative expression is the product of the artist’s unrestricted imagination. In addition, the fantastical connotations justify the sudden mood changes in the pieces. The first piece is in A minor and begins dreamily with hints of melancholy, but concludes in A Major with resolution and hope, looking forward to the next movement. The second piece is in A Major and is playful, upbeat, energetic, and positive; a central section modulates to F Major and puts chromatic triplets in dialogue with the piano. The final piece is again in A Major. The pace suddenly drives into a frenzy of passion and fiery energy, bordering on the irrational. The movement pushes the players to their limits as Schumann labels each of the last two sections (out of three) of the coda “schneller” (faster). The movement ends exuberantly with a triumphant close', 'vimeo', '709513259', '709513259', 'https://play.creartbox.nyc/wp-content/uploads/DSC05239.jpg', '11 min 25 sec', '04/09/2022', '', ARRAY[]::text[], ARRAY['Piano','Viola']::text[], ARRAY['19th Century']::text[], ARRAY['European']::text[], ARRAY['HD video']::text[], ARRAY['Josefina Urraca, piano','Matthew Cohen, viola']::text[], ARRAY[]::text[], false),
  (1807, 'piano-quartet-in-a-minor-op-67', 'Piano quartet in a minor Op.67', 'Born in Seville in 1882, Joaquín Turina Pérez had an expansive and impressive musical career. Originally trained as a pianist, he moved to Madrid at the age of 20 to study at the Schola Cantorum as most Spanish composers did at the time, he met Debussy and Ravel while in Paris, and became good friends with Isaac Albéniz and Manuel de Falla. He wrote the Abbreviated Encyclopedia of Music and two volumes of the Musical Composition Treaty. Turina was also an active music critic, and in 1931 he became the Composition Chair at the Madrid Conservatory. After the Spanish Civil War, he was named General Commissioner of Music, a position through which he launched the Spanish National Orchestra. Turina was, of course, also a prolific composer, equally at home with large and small pieces. His music, spanning nearly all musical genres, was always colorful, well-crafted, and infused with the colors and personality of his native Spanish (Andalusian and Sevillian) home. His Quartet for Piano, Violin, Viola and Cello in A Minor, Op. 67, was composed in 1931 – the same year he became chair at the Madrid Conservatory. The Quartet is written in three movements, with each movement containing melodic references to an ancient cante jondo, the serious ‘deep song’ of southern Spain.', 'vimeo', '713282481', '713282481', 'https://play.creartbox.nyc/wp-content/uploads/DSC05439.jpg', '17 min 38 sec', '04/10/2022', 'https://play.creartbox.nyc/title/piano-quartet-in-a-minor-op-67/', ARRAY[]::text[], ARRAY['Cello','Piano','Viola','Violin']::text[], ARRAY['20th Century']::text[], ARRAY[]::text[], ARRAY['HD video']::text[], ARRAY['Josefina Urraca, piano','Mari Lee, violin','Matthew Cohen, viola','Yi Qun Xu, cello']::text[], ARRAY[]::text[], false),
  (2262, 'piano-trio-n-1', 'Piano Trio n. 1', 'Trio: Violin, Cello, Piano
Duration: 4''30"
(2024)



In this piano trio a reappearing theme, first found in the violin, is passed around to all instruments throughout the piece, finding its way into each of the sections before the end.', 'hls', 'https://vz-a6a9f576-8c5.b-cdn.net/cc063d9a-1b4f-4dbb-ae81-2a52f28b47bd/playlist.m3u8', '', '', '', '', '', ARRAY['Brittney Benton']::text[], ARRAY[]::text[], ARRAY[]::text[], ARRAY[]::text[], ARRAY[]::text[], ARRAY[]::text[], ARRAY[]::text[], false),
  (1486, 'quartet-for-the-end-of-time', 'Quartet for the End of Time', 'Not playing
      Olivier Messiaen · CreArtBox
    
    
  

  
    0:00
    
      
    
    0:00
  

  
    
      
        
        
      
    

    
      
        
      
      
        
      
    

    
      
        
        
      
    
  

  
    I – Crystal liturgy
    II – Vocalise, for the Angel
    III – Abyss of birds
    IV – Interlude
    V – Praise to the eternity of Jesus
    VI – Dance of fury
    VII – Tangle of rainbows
    VIII – Praise to the immortality of Jesus', 'youtube', '', '', 'https://play.creartbox.nyc/wp-content/uploads/ADS_0835.jpg', '53 min 52 sec', '08/31/2019', '', ARRAY['Olivier Messiaen']::text[], ARRAY['Cello','Clarinet','Piano','Violin']::text[], ARRAY['20th Century']::text[], ARRAY['European']::text[], ARRAY['Lossless audio']::text[], ARRAY['Jonathan Cohen, clarinet','Josefina Urraca, piano','Julia Yang, cello','Mari Lee, violin']::text[], ARRAY[]::text[], true),
  (1489, 'trio-for-flute-cello-and-piano', 'Trio for Flute, Cello and Piano', 'I. Largo misterioso - Allegro
Composer, diarist, raconteur – Ned Rorem holds a special place in American arts and letters. He has been described as “an essential, brilliant, and more than occasionally irascible American artist.” Rorem has been prolific with both words and music. “When I was young,” he has said, “it was a toss-up whether I would be a composer or a writer, so I became a little of both.” His 16 volumes of diaries, lectures, and criticism – beginning with his Paris Diary of 1966 – are witty, earthy, graceful, filled with strong opinions, and notoriously candid. Not surprisingly, given his love of both words and music, songs have been at the heart of his work as a composer. He has written hundreds of them – lyrical, deeply felt songs that reflect his exceptional gift for setting words to music. But songs are just the beginning. He has composed innumerable operas, symphonies, concertos, chamber works, and much more. Stylistically he has been called “an elegant anomaly” for the way he has stuck with tonality even during the years when atonal, complex Modernism was sweeping American music.

Rorem has said that the sound of the voice drives his work. “I always think vocally,” he says. “Even when writing for violin or timpani, it’s the vocalist in me trying to get out.” You can hear what he means in the Trio for Flute, Cello, and Piano, a work brimming with songlike lines. The four movements are filled with surprises – theatrical outbursts, seductive solos, high-speed gambols. The first movement belongs to the flute, an instrument that is a particular favorite of Rorem’s (he has described flute music as “song with the voice removed, with the flute as the voice”). Rorem bases the sensuous flute solo that opens and closes the movement on six notes, which are transformed in an exuberant, rhythmically quirky middle section.', 'hls', 'https://vz-a6a9f576-8c5.b-cdn.net/c6d2fbb7-814c-4e42-944c-5b27c52d1a2f/playlist.m3u8', '', 'https://play.creartbox.nyc/wp-content/uploads/003.jpg', '5 min 14 sec', '03/01/2019', '', ARRAY['Ned Rorem']::text[], ARRAY['Cello','Flute','Piano']::text[], ARRAY['21st Century']::text[], ARRAY['American']::text[], ARRAY['HD video']::text[], ARRAY['Guillermo Laporta, flute','Josefina Urraca, piano','Julia Yang, cello']::text[], ARRAY[]::text[], true),
  (1560, 'three-nocturnes', 'Three Nocturnes', 'I. Andante
II. Andante quieto
III. Tempestoso
Ernest Bloch was a composer, conductor, composition teacher, and music school administrator. Three Nocturnes for piano trio was written in Cleveland in 1924, the same year Bloch became an American citizen and one year before he assumed the position as director of San Francisco Conservatory of Music. These melodies are a departure from his earlier style, yet the mysticism and poetry remain. Each movement is written in a neo-classical style and depicts various characteristics of night. The first movement, Andante, evokes darkness and smokiness (listen to the bass line in the piano), while the second movement, Andante quieto, is a tender canonic lullaby. The final nocturne, Tempestoso, is driven by an undulating rhythmic pulse throughout, giving this movement a feeling of restlessness and turbulence. The calm theme from the second nocturne briefly appears, but the insistent repeating rhythmic material returns, only to evaporate into the darkness and mystery of night.', 'hls', 'https://vz-a6a9f576-8c5.b-cdn.net/708189c6-fcce-4eab-a445-0b7e4f12ead9/playlist.m3u8', '', 'https://play.creartbox.nyc/wp-content/uploads/004-3.jpg', '8 min 46 sec', '12/04/2021', '', ARRAY['Ernest Bloch']::text[], ARRAY['Cello','Piano','Violin']::text[], ARRAY['20th Century']::text[], ARRAY[]::text[], ARRAY['HD video']::text[], ARRAY['Josefina Urraca, piano','Keir GoGwilt, violin','Yi Qun Xu, cello']::text[], ARRAY[]::text[], true),
  (1784, 'andante-con-moto-eg-116', 'Andante con moto EG 116', 'Edvard Grieg is known primarily for his orchestral works, his songs and his numerous piano miniatures. Apparently during 1878 he began working on a piano trio but only managed to complete one movement, the Andante con moto in c minor. The manuscript was discovered posthumously by Grieg’s Dutch colleague and close friend of many years, Julius Röntgen. He subsequently wondered whether Grieg would have wanted to publish the trio “fragment,” and so it lay unpublished until 1978 when it was placed in the context of the complete Grieg Edition, a full catalog of his work. Comments in Grieg’s own hand on the manuscript suggest that he was not yet done with even this single movement: he hoped to shorten the middle section. In this sense, it is perhaps most appropriate to regard the movement as a fair draft, a peak into the creative mind of a composer mid-process, where circumstances have left the process frozen in suspended animation. We can only savor this piece as it stands like a compelling, partial treasure from an archeological dig, a fragment of an ideal vase complete only in Grieg’s own mind.', 'hls', 'https://vz-a6a9f576-8c5.b-cdn.net/3748aa40-9902-4e31-abef-7361df1beba3/playlist.m3u8', '', 'https://play.creartbox.nyc/wp-content/uploads/008.jpg', '10 min 39 sec', '12/04/2021', '', ARRAY['Edvard Grieg']::text[], ARRAY['Cello','Piano','Violin']::text[], ARRAY['19th Century']::text[], ARRAY['European']::text[], ARRAY['HD video']::text[], ARRAY['Josefina Urraca, piano','Keir GoGwilt, violin','Yi Qun Xu, cello']::text[], ARRAY[]::text[], true),
  (1796, 'trio-in-e-flat-major-k-498', 'Trio in E flat Major K.498', 'Mozart wrote this piano trio in Vienna and dated the manuscript on August 5, 1786. The work was dedicated to another student of Mozart’s, Franziska von Jacquin; Mozart and the von Jacquin family were close friends. They performed house concerts together, where Nikolaus played the flute and Franziska the piano. Mozart dedicated several works to the von Jacquin family. This clarinet, viola, and piano trio was first played in the von Jacquin’s house; Anton Stadler played clarinet, Mozart the viola, and Franziska von Jacquin the piano. The clarinet was still a relatively new instrument in Mozart’s time, and this trio, along with his Clarinet Quintet and Clarinet Concerto, helped increase the instrument’s popularity. The trio was published in 1788 by Artaria and transcribed– probably with Mozart’s consent–for violin, viola, and piano, with the original clarinet part described as an “alternative part.” Due to this unusual scoring, the piece is sometimes adapted to fit other types of trios, like this version for flute, viola, and piano.', 'hls', 'https://vz-a6a9f576-8c5.b-cdn.net/d55e826c-4173-452b-bed7-4f47f3d99b0b/playlist.m3u8', '', 'https://play.creartbox.nyc/wp-content/uploads/DSC05211-scaled.jpg', '18 min 36 sec', '04/09/2022', '', ARRAY['Mozart']::text[], ARRAY['Flute','Piano','Viola']::text[], ARRAY['18th Century']::text[], ARRAY[]::text[], ARRAY['HD video']::text[], ARRAY['Guillermo Laporta, flute','Josefina Urraca, piano','Matthew Cohen, viola']::text[], ARRAY[]::text[], true),
  (1800, 'trio-op-18', 'Trio Op.18', 'Tatiana Nikolayeva was born in the Soviet Union in 1924. At age five, she began her piano studies with her mother, then became a pupil of Alexander Goldenweiser at the Moscow Conservatory, graduating in 1947. After winning first prize in piano at the 1950 Bach Bicentennial Festival in Leipzig, she launched a significant career in the Soviet Union and Eastern Europe. She began to teach at the Moscow Conservatory in 1959, achieving the rank of professor in 1965. Nikolayeva played many premieres, including the Twenty-four Preludes and Fugues of Dmitri Shostakovich. She assisted the composer during the composition of this major work, which she often performed in public (she gave its world premiere performance in 1952) and recorded on two occasions. She was also a prolific composer, producing her own symphonies, piano concertos, chamber music, and solo piano pieces.', 'hls', 'https://vz-a6a9f576-8c5.b-cdn.net/e6ae9bde-a67f-4dfa-af00-8fdf14ca5d84/playlist.m3u8', '', 'https://play.creartbox.nyc/wp-content/uploads/DSC05267-scaled.jpg', '21 min 57 sec', '04/09/2022', '', ARRAY['Tatiana Nikolayeva']::text[], ARRAY['Flute','Piano','Viola']::text[], ARRAY['20th Century']::text[], ARRAY[]::text[], ARRAY['HD video']::text[], ARRAY['Guillermo Laporta, flute','Josefina Urraca, piano','Matthew Cohen, viola']::text[], ARRAY[]::text[], true),
  (1802, 'we-can-learn-me-together', 'We Can Learn Me Together', '“We Can Learn Me Together” was written for pianist Clare Longendyke and violin/viola duo Sonic Apricity for the 2019 Alba Composition Festival in Alba, Italy. The title of the work is based on the last line of a poem written by my then-girlfriend, now wife, Jess Willis, shortly after we first started dating. Her poem is a deeply personal reflection on the vulnerability inherent to allowing someone to learn beyond the “marketable parts of [yourself].” The feeling of vulnerability, I think, is inherent to creativity; and for me, that manifests itself in this piece with the question: “Could you read a piece of music the same way you read a letter or a poem?” This piece was an attempt to answer that question. I tried to describe the musical events, ideas, and feelings through prose that was written in such a way that, when performed as described, would cause the piece to fit together seamlessly. To my surprise, the experiment worked, and this method of composing has become a staple in my creative process.” -Bryan Wysocki', 'hls', 'https://vz-a6a9f576-8c5.b-cdn.net/ce34a5c8-942a-40e2-a9f8-d960eaafb8a1/playlist.m3u8', '', 'https://play.creartbox.nyc/wp-content/uploads/DSC05348-scaled.jpg', '6 min 17 sec', '04/09/2022', '', ARRAY['Bryan M. Wysocki']::text[], ARRAY['Flute','Piano','Viola']::text[], ARRAY['21st Century']::text[], ARRAY['American']::text[], ARRAY['HD video']::text[], ARRAY['Guillermo Laporta, flute','Josefina Urraca, piano','Matthew Cohen, viola']::text[], ARRAY[]::text[], true),
  (1824, '3-pieces-for-cello-piano', '3 Pieces for Cello & Piano', 'Nadia Boulanger (1887-1979) is fondly remembered as being a leading French composer, conductor and pedagogue of the 20th century. Her pupil list over her teaching years include the likes of Daniel Barenboim, Aaron Copland, Philip Glass, Quincy Jones and Astor Piazzolla. Across her huge career, Boulanger worked in a number of the top teaching institutions such as the Royal Academy of Music, Juilliard School, Yehudi Menuhin School and the Royal College of Music, but her base was always in Paris, France. As well as being a sought-after teacher, Boulanger was also the first woman to conduct some of the major orchestras across the world including The Hallé, BBC Symphony and the Boston Symphony Orchestra. 

Especially during her younger years, Boulanger was a keen composer and many of her works were premiered by top musicians around the world. Her 3 Pieces for Cello & Piano was originally written for organ in 1911, but was transcribed for cello in 1914 by the composer. Now, the cello version is much more widely-performed.', 'hls', 'https://vz-a6a9f576-8c5.b-cdn.net/ac520d65-806a-44ac-920b-5cf2fe24fea5/playlist.m3u8', '', 'https://play.creartbox.nyc/wp-content/uploads/Part-3-Main-Edit-1.jpg', '3 min 32 sec', '', 'https://play.creartbox.nyc/title/3-pieces-for-cello-piano/', ARRAY['Nadia Boulanger']::text[], ARRAY['Cello','Piano']::text[], ARRAY['20th Century']::text[], ARRAY['European']::text[], ARRAY['4k video','HD video']::text[], ARRAY['Josefina Urraca, piano','Julia Yang, cello','Sarah K. Williams, visual Artist','visual artist']::text[], ARRAY[]::text[], true),
  (1828, 'piano-quintet-in-g-minor-op-49', 'Piano Quintet in G minor, Op. 49', 'The Quintet, Op. 49, while never claiming to be a score of great consequence, nonetheless seduces the listener with its grace and spontaneity. The opening phrase is played in unison and immediately introduces the rhythmic elements that define Granados’s writing. If the initial atmosphere is one of passion and a certain tension, the second section is more intense and expressive. The movement ends with an energetic return to the principal motif. Beauty, taste and refinement are the hallmarks of the second movement. The use of mutes creates a remote, bucolic sound and, thanks to the triple-time rhythm, a light, almost magical rocking motion. Contrast is provided in the final movement by the prominence given to what is now a clearly defined rhythm, and by the use of modal harmonies that give a gypsy air to a lively main theme that reappears in the manner of a rondo.', 'hls', 'https://vz-a6a9f576-8c5.b-cdn.net/925210c7-f30b-4a8a-b7e8-8f4d26c8150a/playlist.m3u8', '', 'https://play.creartbox.nyc/wp-content/uploads/DSC00357-2.jpg', '17 min 14 sec', '09/27/2022', '', ARRAY['Enrique Granados']::text[], ARRAY['Cello','Dance','Flute','Piano','Viola','Violin']::text[], ARRAY['20th Century']::text[], ARRAY['European']::text[], ARRAY['4k video','HD video']::text[], ARRAY['Emilie Anne Gendron, violin','Guillermo Laporta, flute','Josefina Urraca, piano','Julia Yang, cello','Matthew Cohen, viola','Sarah K. Williams, visual Artist']::text[], ARRAY[]::text[], true),
  (1867, 'heart-meditation', 'Heart Meditation', 'Heart Meditation is a piece for ensemble and electronic track. The piece works with two time systems: an equivalent of the heartbeat as an internal pulse and seconds. The musicians move intuitively through 30 second timeframes. They move intuitively on their own, but have certain anchor points where they have to move together. It''s an 11min journey.', 'hls', 'https://vz-a6a9f576-8c5.b-cdn.net/67fbe759-5a8f-4ea0-8a1c-95d82741c0fb/playlist.m3u8', '', 'https://play.creartbox.nyc/wp-content/uploads/056-scaled.jpg', '11 min 33 sec', '09/27/2022', '', ARRAY['Annamaria Kowalsky']::text[], ARRAY[]::text[], ARRAY['21st Century']::text[], ARRAY['European']::text[], ARRAY['4k video','HD video']::text[], ARRAY['Emilie Anne Gendron, violin','Guillermo Laporta, flute','Josefina Urraca, piano','Julia Yang, cello','Matthew Cohen, viola']::text[], ARRAY[]::text[], true),
  (1871, 'kakadu-variations-op-121a', 'Kakadu variations op. 121a', '"Kakadu[a] Variations" is the nickname given to Ludwig van Beethoven''s set of variations for piano trio on the theme "Ich bin der Schneider Kakadu" by Wenzel Müller. The Variations was published in 1824 as Opus 121a, the last of Beethoven''s piano trios to be published. The work is notable for the contrast between its solemn introduction and the lightweight variations that follow.', 'hls', 'https://vz-a6a9f576-8c5.b-cdn.net/8449800a-22ca-4c32-9d01-6899707dc376/playlist.m3u8', '', 'https://play.creartbox.nyc/wp-content/uploads/10.jpg', '24 min 22 sec', '01/26/2018', '', ARRAY['Ludwig van Beethoven']::text[], ARRAY['Cello','Piano','Violin']::text[], ARRAY['18th Century','19th Century']::text[], ARRAY['European']::text[], ARRAY['HD video']::text[], ARRAY['Josefina Urraca, piano','Julia Yang, cello','Mélanie Clapiès, violin']::text[], ARRAY[]::text[], true),
  (1883, 'toccata-bruise', 'Toccata & bruise', 'toccata &amp; bruise is a duet for piano &amp; pianist about the musical concept of touch.

Throughout the piece, the pianist listens to Glenn Gould performing his piano transcription of Jan Sweelinck’s Fantasie Contraria in G Dorian for organ, recorded live in Salzburg in 1959. Though the audience barely hears the Gould recording, it serves as an audio score via which the pianist precisely synchronises her actions with the fixed video playback.

toccata &amp; bruise is a transcriptive fantasy of Glenn Gould’s transcription of Sweelinck’s Fantasie. The organ is an instrument with limited response to tactile touch: its variation in dynamics and timbre comes from mechanical manoeuvres. Glenn Gould’s transcription for piano—an instrument whose practice is shrouded in the pursuit of immaculate “touch”—therefore composes a tactile fantasia out of the cerebral counterpoint of Sweelinck’s mirror fugue. The visual and gestural material of toccata &amp; bruise are choreographed to Gould’s recording, visually transcribing the sensations of touch which he projects onto Sweelinck’s Fantasie. This piece takes the three distinct parts of the Sweelinck—an opening fugue, a middle toccata, and a final fantasia—as its own formal divisions. Like a lost wax cast, both the sounds of Gould’s piano and the onstage piano have been shed from the process, leaving behind only phantoms of the touch that produced them.', 'hls', 'https://vz-a6a9f576-8c5.b-cdn.net/64de021c-2d12-4318-b21b-7ee6851d53ee/playlist.m3u8', '', 'https://play.creartbox.nyc/wp-content/uploads/085-scaled.jpg', '9 min 21 sec', '09/10/2022', '', ARRAY['Celeste Oram']::text[], ARRAY['Electronics','Piano']::text[], ARRAY['21st Century']::text[], ARRAY[]::text[], ARRAY['4k video']::text[], ARRAY['Josefina Urraca, piano']::text[], ARRAY[]::text[], true),
  (1935, 'sonata', 'Deuxième Sonate en trio', 'This is arguably one of the masterpieces of 20th-century chamber music, written by Debussy in 1923 for flute, viola, and harp as part of a collection of works for unusual ensembles. In our version, with piano instead of harp, CreArtBox incorporates new colors into this historic piece.

00:00 I - Pastorale. Lento, dolce rubato
07:44 II - Interlude. Tempo di minuetto
14:01 III - Final. Allegro moderato ma risoluto

Recorded live at Culture Lab LIC as part of the CreArt Music Festival:
Josefina Urraca, piano
Guillermo Laporta, flute
Matthew Cohen, viola

Visuals by Guillermo Laporta

#Debussy #chambermusic #CreArtBox #classicalmusic #musicfestival #piano #flute #viola', 'hls', 'https://vz-a6a9f576-8c5.b-cdn.net/64946dd5-307a-4ab6-9027-c02023c7cfd9/playlist.m3u8', '', 'https://play.creartbox.nyc/wp-content/uploads/002-3.jpg', '', '', '', ARRAY['Claude Debussy']::text[], ARRAY['Flute','Piano','Viola']::text[], ARRAY['19th Century']::text[], ARRAY['European']::text[], ARRAY['HD video']::text[], ARRAY['Guillermo Laporta, flute','Josefina Urraca, piano','Matthew Cohen, viola']::text[], ARRAY[]::text[], true),
  (2008, 'vivaldi-la-notte', 'La Notte', 'Experience the haunting beauty of Vivaldi''s "La Notte" in this arrangement for flute, string trio, and piano. This performance brings a fresh and intimate perspective to Vivaldi''s masterful composition, blending the rich tones of strings with the delicate expressiveness of the flute and the harmonic depth of the piano.

Harriet Langley, violin
Mathew Cohen, viola
Julia Yang, cello
Guillermo Laporta, flute
Josefina Urraca, piano

"La Notte", Flute Concerto in G Minor, RV. 439 [10'']
00:00 I. Largo
01:48 II. Presto (Fantasmi) [2'']
02:33 III. Largo [2'']
03:49 IV. Presto [1'']
04:55 V. Largo (Il sonno) [2'']
06:23 VI. Allegro [2'']

About the Piece:
Antonio Vivaldi''s "La Notte" is part of his famous collection of flute concertos, each capturing the essence of different times of the day. "La Notte" (The Night) is known for its evocative, dream-like quality and dramatic contrasts. This arrangement highlights the piece''s intricate textures and emotional depth, making it a truly enchanting listening experience.

???? Don''t forget to like, comment, and subscribe for more classical music performances!

#Vivaldi #LaNotte #Flute #StringTrio #Piano #ClassicalMusic #ChamberMusic #MusicArrangement #VivaldiLaNotte #LivePerformance #BaroqueMusic', 'hls', 'https://vz-a6a9f576-8c5.b-cdn.net/73ab8300-a9b0-403a-9c15-25e00fddfd55/playlist.m3u8', '', 'https://play.creartbox.nyc/wp-content/uploads/circlenoirphoto2.jpg', '8 min 37 sec', '12/10/2023', '', ARRAY['Vivaldi']::text[], ARRAY['Cello','Flute','Piano','Viola','Violin']::text[], ARRAY['17th Century']::text[], ARRAY['European']::text[], ARRAY['4k video']::text[], ARRAY['Guillermo Laporta, flute','Harriet Langley, violin','Josefina Urraca, piano','Julia Yang, cello','Matthew Cohen, viola']::text[], ARRAY[]::text[], true),
  (2011, 'kaddish', 'Kaddish', 'Maurice Ravel, a towering figure in early 20th-century French music, is celebrated for his masterful orchestration and innovative harmonic language. While often linked to the Impressionist movement, Ravel''s compositions reveal a unique voice characterized by precision, elegance, and a profound emotional depth.

"Kaddish" is part of Ravel''s "Deux mélodies hébraïques," composed in 1914. The term "Kaddish" refers to an ancient Aramaic prayer in Jewish tradition, recited in mourning rituals and ceremonies that praise and sanctify God''s name. This prayer is deeply rooted in the cultural and spiritual fabric of Judaism, embodying themes of loss, remembrance, and hope.

Initially written for voice and piano, "Kaddish" has been transcribed for various instrumental combinations, including this evocative version for cello and piano. In this arrangement, the cello assumes the role of the cantor, articulating the prayer''s plaintive and soulful melody, while the piano provides a delicate and supportive harmonic texture.

The piece opens with a haunting and lyrical theme in the cello, capturing the melismatic quality of Jewish chant. Ravel''s sensitivity to the prayer''s emotional weight is evident in the music''s introspective and meditative character. As the piece progresses, the interplay between the cello and piano deepens, creating an intimate dialogue that resonates with the themes of reverence and spiritual introspection.

"Kaddish" for Cello and Piano stands as a testament to Ravel''s ability to transcend cultural boundaries, infusing his music with universal expressions of human experience. This piece remains a poignant and cherished work, celebrated for its emotional depth, profound simplicity, and the evocative power of its melodies.

Performance Context:

This performance of Ravel''s "Kaddish" is part of the CIRCLE NOIR (PART I) program, presented by CreArtBox. Featuring Josefina Urraca on piano, Guillermo Laporta on flute, and Julia Yang on cello, the program showcases a diverse selection of works, blending classical masterpieces with contemporary compositions. The concert takes place on a 360-degree platform at The William Vale, creating an immersive experience that blurs the boundaries between performers and audience.', 'youtube', 'JNTy18Ka61Y', 'JNTy18Ka61Y', 'https://play.creartbox.nyc/wp-content/uploads/kadish.jpg', '', '11/12/2023', '', ARRAY['Maurice Ravel']::text[], ARRAY['Cello','Piano']::text[], ARRAY['20th Century']::text[], ARRAY['European']::text[], ARRAY['4k video']::text[], ARRAY['Josefina Urraca, piano','Julia Yang, cello']::text[], ARRAY[]::text[], true),
  (2014, 'pictures-at-an-exhibition', 'Pictures at an Exhibition', 'Modest Mussorgsky, a pioneering Russian composer, is best known for his ability to evoke vivid imagery and deep emotion through music. "Pictures at an Exhibition" is one of his most celebrated works, originally composed for solo piano in 1874. This suite was inspired by the artworks of Mussorgsky''s friend, the architect and painter Viktor Hartmann, whose sudden death deeply affected the composer. The music serves as a tribute to Hartmann, capturing the essence of his artworks in a series of musical vignettes.

The transcription for piano, violin, viola, cello, and flute brings a new dimension to this masterwork, adding rich textural layers and expanding its tonal palette. This version retains the original''s emotional depth and vivid character while exploring the interplay between strings, winds, and piano.

Movements and Descriptions:

 	Promenade - The recurring Promenade theme represents the composer strolling through the exhibition, reflecting on each piece of art.
 	Gnomus - Depicts a grotesque gnome, inspired by a sketch of an eerie nutcracker.
 	The Old Castle - Evokes a melancholic medieval castle, with the flute emulating a troubadour''s song.
 	Tuileries (Children''s Quarrel after Games) - Captures the lively atmosphere of the Tuileries Gardens, filled with playful children.
 	Bydło - Represents an ox-cart trudging along, conveyed through a heavy, plodding rhythm.
 	Ballet of the Unhatched Chicks - A whimsical portrayal of chicks dancing in their shells, filled with playful energy.
 	"Samuel" Goldenberg and "Schmuÿle" - A contrast between two characters, one rich and pompous, the other poor and pleading.
 	Limoges. The Market (The Great News) - Depicts a bustling French marketplace, full of animated chatter.
 	Catacombs (Roman Tomb) - A somber reflection on mortality, leading into the eerie "Cum mortuis in lingua mortua" (With the Dead in a Dead Language).
 	The Hut on Fowl''s Legs (Baba Yaga) - A wild and frenetic depiction of the witch Baba Yaga''s hut, leading into the suite''s grand finale.
 	The Great Gate of Kiev - A majestic and triumphant conclusion, inspired by Hartmann''s design for a grand city gate.', 'hls', 'https://vz-a6a9f576-8c5.b-cdn.net/b4dc09b9-0cfa-41a4-b6b8-101953bfaee5/playlist.m3u8', '', 'https://play.creartbox.nyc/wp-content/uploads/pictures2.jpg', '36 min 15 sec', '11/14/2023', '', ARRAY['Modest Mussorgsky']::text[], ARRAY['Cello','Flute','Piano','Viola','Violin']::text[], ARRAY['19th Century']::text[], ARRAY[]::text[], ARRAY['4k video']::text[], ARRAY['CreArtBox Ensemble','Emilie Anne Gendron, violin','Guillermo Laporta, flute','Josefina Urraca, piano','Julia Yang, cello','Matthew Cohen, viola']::text[], ARRAY[]::text[], true),
  (2026, 'chesapeake', 'Chesapeake', '"Chesapeake" is a part of "Pieces of Place," an ongoing series for chamber ensembles with or without electronics, exploring the intersection of geology, ecology, and personal memories. As the composer states: "Each Piece of Place explores the relationships between geological processes, ecosystems, and personal memories in a place I''ve called home. Musically, elements of each place are articulated with rhythms, phrasing, and larger forms to create a feeling of events unfolding simultaneously on vastly different timescales. Each piece creates time and space to perceive processes that are otherwise too vast for human perception. The music strives for a more integrated human-bio-geological awareness. It blurs the boundaries between the personal and the societal; the cognitive and the emotional; biological and geological.', 'hls', 'https://vz-a6a9f576-8c5.b-cdn.net/096b2a96-cb99-4581-92a8-50e5580b3688/playlist.m3u8', '', 'https://play.creartbox.nyc/wp-content/uploads/004-4.jpg', '10 min 2 sec', '12/10/2023', '', ARRAY['Hannah Selin']::text[], ARRAY['Cello','Flute','Piano','Viola','Violin']::text[], ARRAY['21st Century']::text[], ARRAY['American']::text[], ARRAY['4k video']::text[], ARRAY['CreArtBox Ensemble','Guillermo Laporta, flute','Harriet Langley, violin','Josefina Urraca, piano','Julia Yang, cello','Matthew Cohen, viola','visual artist']::text[], ARRAY[]::text[], true),
  (2028, 'afilador', 'Afilador', 'This chamber music piece, written by CreArtBox''s resident composer, Andrea Casarrubios, captures the essence of nomadic knife sharpeners navigating the streets of Spain. Originally commissioned by the Chicago Symphony Orchestra, this version, adapted by the composer, reintroduces the flute—an instrument traditionally employed by these nomads to lure new clients. Through skillful transformation, it infuses their sounds with heart-shaking melodies and rhythms.', 'hls', 'https://vz-a6a9f576-8c5.b-cdn.net/d6914ec2-693c-4013-805e-356129f0375c/playlist.m3u8', '', 'https://play.creartbox.nyc/wp-content/uploads/002.jpg', '10 min 2 sec', '11/14/2023', '', ARRAY['Andrea Casarrubios']::text[], ARRAY['Cello','Flute','Viola','Violin']::text[], ARRAY['21st Century']::text[], ARRAY['American','European']::text[], ARRAY['4k video']::text[], ARRAY['Emilie Anne Gendron, violin','Guillermo Laporta, flute','Julia Yang, cello','Matthew Cohen, viola']::text[], ARRAY[]::text[], true),
  (2046, 'thousandth-orange', 'Thousandth Orange', 'CreArtBox presents a live performance of Thousandth Orange by composer Calorine Shaw, a vivid and rhythmically intricate work that explores color, contrast, and layered textures in chamber music. Captured during our February concert at the DiMenna Center, this piece showcases the ensemble’s commitment to bold, contemporary repertoire and immersive live experiences.', 'hls', 'https://vz-a6a9f576-8c5.b-cdn.net/fd38ec57-081a-4b2c-8bb7-d124b1496169/playlist.m3u8', '', 'https://play.creartbox.nyc/wp-content/uploads/495392654_1316810157117922_6079046438971270533_n.jpg', '11 min 38 sec', '02/11/2025', 'https://play.creartbox.nyc/title/thousandth-orange/', ARRAY['Caroline Shaw']::text[], ARRAY['Cello','Piano','Viola','Violin']::text[], ARRAY['21st Century']::text[], ARRAY['American']::text[], ARRAY['24bits audio','4k video']::text[], ARRAY['Emilie Anne Gendron, violin','Josefina Urraca, piano','Julia Yang, cello','Matthew Cohen, viola']::text[], ARRAY[]::text[], true),
  (2221, 'american-quartet', 'American Quartet', 'Dvorak - American Quartet
      Live at the DiMenna Center

    
    
  

  
    0:00
    
      
    
    0:00
  

  
    
      
        
        
      
    

    
      
        
      
      
        
      
    

    
      
        
        
      
    
  

  
  

  
    Dvorak – String Quartet No.12 
    I. Allegro ma non troppo
  
  
    Dvorak – String Quartet No.12 
    II. Lento
  
  
    Dvorak – String Quartet No.12 
    III. Molto vivace — Trio
  
  
    Dvorak – String Quartet No.12 
    IV. Finale. Vivace ma non troppo
  




Composed in 1893 during Antonín Dvořák’s summer retreat in Spillville, Iowa, the “American” Quartet reflects the composer’s immersion in the American landscape and its diverse musical influences. While Dvořák did not explicitly quote Native American or African American melodies, the quartet’s use of pentatonic scales and rhythmic vitality evoke the spirit of American folk traditions.&nbsp;

In this performance, CreArtBox presents a unique arrangement where the first violin part is performed on the flute. This adaptation offers a fresh timbral perspective, highlighting the lyrical qualities of the flute and bringing new color to Dvořák’s melodic lines. The ensemble’s interpretation aims to honor the original work’s character while exploring its textures through this distinctive instrumentation.

This rendition exemplifies CreArtBox’s commitment to reimagining classical repertoire, inviting audiences to experience familiar works through innovative arrangements and performances.', 'none', '', '', 'https://play.creartbox.nyc/wp-content/uploads/IMG_3176-scaled.png', '26 min 52 sec', '05/29/2025', '', ARRAY['Antonín Dvořák']::text[], ARRAY['Cello','Flute','Viola','Violin']::text[], ARRAY['20th Century']::text[], ARRAY[]::text[], ARRAY['Lossless audio']::text[], ARRAY['Emilie Anne Gendron, violin','Guillermo Laporta, flute','Julia Yang, cello','Matthew Cohen, viola']::text[], ARRAY[]::text[], true),
  (2225, 'thousandth-orange-2', 'Piano Quartet No. 3 in C minor, Op. 60 (III. Andante)', 'Brahms’ Piano Quartet No. 3 in C minor, Op. 60 (III. Andante) combines piano and strings in a masterful dialogue of emotion and structure. Composed in 1875, this movement highlights Brahms’ balance of lyrical elegance and dramatic intensity. Presented by CreArtBox, a New York-based organization supporting innovative live music experiences and artist collaborations, this performance merges chamber music with stage design and video artistry. Venue: DiMenna Center, New York Video Production: Rodrigo Aranjuelo, Brian Chacon & Guillermo Laporta Funded by the New York State Council on the Arts, with support from the Office of the Governor and the New York State Legislature', 'hls', 'https://vz-a6a9f576-8c5.b-cdn.net/62d677e1-e80a-4bdf-bd3c-3973893802e1/playlist.m3u8', '', 'https://play.creartbox.nyc/wp-content/uploads/04.jpg', '9 min 30 sec', '02/11/2025', '', ARRAY['Johannes Brahms']::text[], ARRAY['Cello','Piano','Viola','Violin']::text[], ARRAY[]::text[], ARRAY[]::text[], ARRAY['24bits audio','4k video']::text[], ARRAY['Emilie Anne Gendron, violin','Josefina Urraca, piano','Julia Yang, cello','Matthew Cohen, viola']::text[], ARRAY[]::text[], true),
  (2256, 'musica-ricercata', 'Musica Ricercata', 'Not playing
      György Ligeti · Musica Ricercata
    
    
  

  
    0:00
    
      
    
    0:00
  

  
    
      
        
        
      
    

    
      
        
      
      
        
      
    

    
      
        
        
      
    
  


    I. Allegro con spirito
    II. Rubato lamentoso
    III. Allegro grazioso
    IV. Presto ruvido
    V. Adagio mesto. Béla Bartók in memoriam
    VI. Molto vivace, capriccioso




György Ligeti’s Musica ricercata (1951–53) is one of the composer’s most inventive early works. In this arrangement by Guillermo Laporta, the piece unfolds as a gradual exploration of musical possibility. Each movement introduces one additional pitch, beginning with a single note and slowly expanding into a rich and complex harmonic world.

Ligeti approached the idea of ricercata literally, searching for a new musical language built from the simplest materials. The result is a sequence of miniature musical experiments that combine rigor, humor, and expressive intensity. Some of this material would later appear in Ligeti’s well-known Six Bagatelles for Wind Quintet.', 'hls', 'https://vz-a6a9f576-8c5.b-cdn.net/4214c16c-1c0a-4bdc-b4de-6b93bf95246e/playlist.m3u8', '', 'https://play.creartbox.nyc/wp-content/uploads/MG_0161.jpg', '14 min 32 sec', '12/12/2025', 'https://play.creartbox.nyc/title/musica-ricercata/', ARRAY['György Ligeti']::text[], ARRAY['Cello','Flute','Piano','Viola','Violin']::text[], ARRAY['20th Century']::text[], ARRAY['European']::text[], ARRAY['24bits audio','4k video']::text[], ARRAY['Emilie Anne Gendron, violin','Guillermo Laporta, flute','Josefina Urraca, piano','Julia Yang, cello','Matthew Cohen, viola']::text[], ARRAY[]::text[], true),
  (2260, 'twilight-at-dawn', 'Twilight at Dawn', 'Twilight at Dawn (2024) lingers in the fragile space between night and day, where light first breaks through darkness. It is music of thresholds—hesitant, searching, and luminous—inviting us to dwell in the mystery of beginnings.', 'hls', 'https://vz-a6a9f576-8c5.b-cdn.net/34b94837-4267-4e67-b6df-fb50ea4c55e1/playlist.m3u8', '', 'https://play.creartbox.nyc/wp-content/uploads/DSC0028-scaled.jpg', '5 min 54 sec', '10/17/2025', '', ARRAY['Devin Cholodenko']::text[], ARRAY['Cello','Flute','Viola','Violin']::text[], ARRAY['21st Century']::text[], ARRAY['American']::text[], ARRAY['24bits audio','4k video','Lossless audio']::text[], ARRAY['Guillermo Laporta, flute','Julia Yang, cello','Matthew Cohen, viola']::text[], ARRAY[]::text[], true)
on conflict (slug) do update set
  wp_id = excluded.wp_id,
  title = excluded.title,
  description = excluded.description,
  video_type = excluded.video_type,
  video_url = excluded.video_url,
  video_id = excluded.video_id,
  thumbnail_url = excluded.thumbnail_url,
  duration = excluded.duration,
  release_date = excluded.release_date,
  original_link = excluded.original_link,
  composers = excluded.composers,
  instruments = excluded.instruments,
  periods = excluded.periods,
  nationalities = excluded.nationalities,
  qualities = excluded.qualities,
  performers = excluded.performers,
  categories = excluded.categories,
  published = excluded.published;
