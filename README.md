# JustAlkaid.github.io
A Simple Docsify Static Page for Homework.

Contributors:
JustAlkaid (Owner), Lucio-ball, NoobProgrammer3105, oran-gitversion

File Structure:
```
.  
├── README.md (the readme file for the whole repository)
|
├── assets (all resources, such as music, pictures, video, etc.)
|   ├── img (all .jpg .png .webp pictures)
|   |   └── ...
|   └── svg (all .svg pictures)
|       └── ...
|
├── docs (at which docsify is used)  
|   ├── en (English pages)  
|   └── zh (Chinese pages)  
|       ├── js (javascript used in some pages inside /docs/zh)
|       |   └── ...
|       ├── stylesheet (stylesheet used in some pages inside /docs/zh)
|       |   └── less
|       |       └── ...
|       ├── articles (Chinese articles in .md files)
|       |   ├── pages.json (index for all articles, auto genereated)
|       |   └── ... (classified according to _sidebar.md)
|       ├── secret (off-topic things)
|       ├── index.html (a html templete that docsify used to construct all other pages with .md files)
|       ├── _sidebar.md (the sidebar defination)
|       └── README.md  (the entry page for docsify)
|
├── js (all javascript used in multiple pages) 
|   └── ...  
|
├── stylesheet (all stylesheets used in multiple pages)  
|   ├── css  
|   |   └── ...  
|   └── less  
|       └── ...  
|
├── treasure_chest (pages or projects used in this website, displayed in the treasure_chest dropdown menu)
|   └── ...
|
├── generate_files.py (a python script that generates json file of all articles)
├── 404.html (404 page)
├── index.html (the entry page for the whole website)
├── LICENSE  
└── .nojekyll  
```