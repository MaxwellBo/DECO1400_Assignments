
# Secret of the Pyramids
### Max Bo - 43926871
### DECO1400 Report 

The website aims to enhance a pre-existing *"Choose Your Own Adventure Story"* with interactive elements. *Secret of the Pyramids* by Richard Brightfield was chosen. The blurb provides an insight into the subject matter and the style of writing of the book:

> You are in Egypt to help your uncle Bruce with his scientific experiments. You are investigating a theory that the ancient pyramids possess strong mystical powers. You have just entered the Great Pyramid. An underground tunnel leads you to a dark and mysterious chamber. You are the first person to discover it. Is this a clue to the secret of the Pyramids -- or a room of danger?

The complete e-book is stored in `./etc/` as `Secret of the Pyramids-Chose Your Own Adveture 19-Richard Brightfield.pdf`. 

It features simplistic language, a setting that appeals primarily to children aged 6 to 9, and age appropriate illustrations. Website aesthetics can be immersive, exaggerated, kitchy and skeuomorphic; the Egyptian theme should be compltely embraced, and will likely to appeal to users of this target age group. Furthermore, interactive facilities that are game-like, permitting the user to manipulate the flow and progression of the story, is more likely to appeal than facilities that provide trivial utility. 

Users of this age require textual presentation that shouldn't hinder developing reading skills. Text should be sufficiently large, with high character and line spacing. Serifed fonts are likely difficult to read for this age group; while a serifed font is themetically a better aesthetic choice, they have been avoided in instances where the text is small, such as the body text. *Guardian Egyptian Headline* has been chosen as the header font. While serifed, it shall only be used in high-fontsize and high-contrast environments. It is a strong choice aesthetically and thematically. *Andale Mono* is an exceptional choice for small headers and body text - giving a time -appropriate typewriter look, while being an easy to read monospaced sans-serif. 

A short maximum line length is absolutely critical - young readers are more likely to lose track of their position when scanning. The site should have a simple user-interface without excessive use of gimmick and motion. Thus, the aesthetic should be achieved with pattern, colour, and illustration; anything else and the audience is likely to be distracted or confused. The site should adhere to the UNIX philosophy - *"do one thing and do it well."*. 

The [Solarized Light Theme](http://ethanschoonover.com/solarized) was chosen as the colorscheme. It has similarities to the stereotypical color of the Egyptian desert and pyramids. Furthermore, it has been "[tested] on color calibrated displays (as well as uncalibrated/intentionally miscalibrated displays) and in a variety of lighting conditions" to optimize readibility, clarity, and eye health.

The [*"Small Steps"** pattern](http://subtlepatterns.com/small-steps/) was used to style the background of the navigation pane, and the [*"Pyramid pattern"*](http://subtlepatterns.com/pyramid/) for the divider between the navigation pane and the main body. They are unsubtle attempts to replicate the steps of the pyramid and typical Ancient Egyptian styling respectively. 

The site structure and interactivity of the site are strongly linked. The main attraction of the site is the interactive story map. A graph, made up of nodes representing sections in the story, is gradually built up as the user makes story choices. The user can see the currently viewed section, any decisions previously made, and how those choices link together sections of the story. The user is encouraged to back-track, by clicking on nodes, and making the "other" choice, filling out more of the graph. The graph shows that choices may converge, or backtrack to other nodes, rather than following a purely linear tree. 

The "fleshed out" graph looks like this: 

![FleshedOutGraph](http://i.imgur.com/qlK9hWA.png)

*A dynamically generated "graph" sitemap was chosen instead of a statically linked "list" sitemap. The latter may reveal spoilers, misrepresent the story structure, and daunt younger audiences.*

*Particular note must be made to the implementation of the sitemap. The graph is generated from a textual model stored in a hashmap. It is not hardcoded in any way. Particular care was made to ensure that new sections can be easily added, and that preexisting sections could be quickly relinked and rearranged.*

When progressing through the story in explatory manner, the user starts at the beginning of the section. When backtracking through previous sections that they have (hopefully) read, the user is scrolled immediately to the available choices.

It is hoped that the interactive element enhances the educational potential of the original work. The graph contextualizes the users position in the storyline, enhancing reading comprehension. The interactivity immediately appeals the target audience by "gameifying" the reading process. The achievement of "fleshing out" the graph encourages the users to read every single section. The user is encouraged to create their own mental graph, to see if they've missed exploring a section. Typical *"Choose Your Own Adventure"*s can be an confusing experience; the interactive graph does away with confusing page flicking and chains of backtracking. Furthermore, other "Choose Your Own Adventure"s use standard hyperlinked pages - browsers collapse the story into a linear history, robbing the user of contextualization in the narrative and confusing them with temporal jumps. 

A standard *"Choose Your Own Adventure"*-esque hyperlink jumping  exists in the no-script variant of the site. On access to both Javascript and JQuery, the local hyperlinks are removed, and `onClick` handlers are bound to manipulate the model and the view.

The site, with its innovative use of an interactive sitemap, and explicit attention to reading accessability, makes the consumption of the *"Choose Your Own Adventure"* easier and more enjoyable.

`~ Max Bo`
