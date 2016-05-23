The Brief

You are to design & implement an interactive story website. Your starting point should be a chapter from a printed fiction - you will need to provide a reference to this. If you wish, you could create a digital version of a printed  "choose your own adventure" book - again you will need to provide a reference for this.

Your design should take into consideration:

age group for the book being referenced
genre of the story
the translation of physical form to digital
appropriateness of interactive elements for audience & story
imagery/aesthetic to support the story
In terms of interactive elements, your implementation should incorporate:

navigation between multiple pages
manipulation of DOM content in response to user input
manipulation of document presentation in response to user & story




The Report

The design report should document the design and development decisions for your website. In each section, you should be providing justification for your design decisions. You should describe why you have chosen to design or develop a particular element & make sure to refer it back to the story, brief & intended audience. The report should follow the structure outlined below.

**Introduction : A brief description/outline of your design document – what can we expect to read in the following pages?**




The website aims to enhance a pre-existing "Choose Your Own Adventure Story" with interactive elements. *Secret of the Pyramids* by Richard Brightfield was chosen. The blurb provides an insight into the subject matter and the style of writing of the book:

> You are in Egypt to help your uncle Bruce with his scientific experiments. You are investigating a theory that the ancient pyramids possess strong mystical powers. You have just entered the Great Pyramid. An underground tunnel leads you to a dark and mysterious chamber. You are the first person to discover it. Is this a clue to the secret of the Pyramids -- or a room of danger?

The complete e-book is stored in `./etc/` as `Secret of the Pyramids-Chose Your Own Adveture 19-Richard Brightfield.pdf`. 

It features simplistic language, and a setting that appeals primarily to children aged 6 to 9, as well as age appropriate illustrations. Website aesthetics can be immersive, exaggerated, kitchy and skeuomorphic; the Egyptian theme is compltely embraced, and more likely to appeal to users of this target age group. Furthermore, interactive facilities that are game-like, permitting the user to manipulate the flow and progression of the story, is more likely to appeal than facilities that provide trivial utility. 

Readers of this age require textual presentation that shouldn't hinder developing reading skills. Text should be sufficiently large, with high character and line spacing. Serifed fonts are likely difficult to read for this age group; while a serifed font is themetically a better aesthetic choice, they have been avoided in instances where the text is small, such as the body text. *"Guardian Egyptian Headline"* has been chosen as the header font. While serifed, it shall only be used in high-fontsize and contrast environments. It is also strong choice aesthetically and thematically. "Andale Mono" is an exceptional choice for small headers and body text - giving a time-period appropriate typewriter look, while being an easy to read monospaced sans-serif.


A short maximum line length is absolutely critical - young readers are more likely to lose track of their position when scanning.

The site should have a simple user-interface without excessive use of gimmick and motion. Thus, the aesthetic should be achieved with pattern, colour, and illustration; anything else and the audience is likely to be distracted or confused. The site should adhere to the UNIX philosophy - *"do one thing and do it well."*. 

Visual Design : For your site provide specification for the visual design of the site. This should include a description of the visual aesthetic & how it relates to user & story, a colour scheme (including hex codes & usage), text treatment & a mockup of one key page in the site. The mockup is should be representative of the final design.








Site Content & Structure : Provide a site map to show the structure of the site, an annotated wireframe for each different page layout (not for each page) and a breakdown of what content & functionality will appear on each page of the site.


The site structure and interactivity of the site are strongly linked. The main attraction of the site is the interactive story map. A graph, made up of nodes representing sections in the story, is gradually built up as the user makes story choices. The user can see any decisions previously made, the currently viewed, and how those choices link together sections of the story. The user is encouraged to back-track, by clicking on nodes, and making the "other" choice, filling out more of the graph. The graph shows that choices may converge, or backtrack to other nodes, rather than following a purely linear tree. 

This interactivity immediately appeals the target audience. The achievement of "fleshing out" the graph encourages the users to read every single section. 

The "fleshed out" graph looks like this: ![FleshedOutGraph](http://i.imgur.com/qlK9hWA.png)

*Particular note must be made to the implementation. The graph is generated from a textual model stored in a hashmap. It is not hardcoded in any way. Particular care was made to ensure that new sections can be easily added, and preexisting sections can quickly be relinked and rearranged.*

The user is encouraged to create their own mental graph, to see if they've missed exploring a section". When progressing through the story in explatory manner, the user starts at the beginning of the section. When backtracking through previous sections that they have (hopefully) read, the user is scrolled immediately to the available choices.

A standard "Choose Your Own Adventure"-esque hyperlink jumping  exists in the no-script variant of the site. On access to both Javascript and JQuery, the local hyperlinks are removed, and `onClick` handlers are bound to manipulate the model.


Functionality & Interactivity : This section focuses on the JavaScript elements that you will be introducing to the story. Discuss how the printed story has been translated to interactive, digital form and provide a description of the interactivity of the site (beyond standard hyperlinking). Provide task flows for key user interactions and describe how each contributes to user engagement with the story.

Conclusion : Provide a wrap-up for the report, a final summary of the outcome of your website.

