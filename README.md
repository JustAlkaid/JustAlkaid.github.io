# JustAlkaid.github.io
A Simple Docsify Static Page for Homework.

Contributors:
JustAlkaid (Owner)

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
|       |   └── ... (classified according to _sidebar.md)
|       ├── secret (off-topic things)
|       ├── index.html (a html templete that docsify used to construct all other pages with .md files)
|       ├── _sidebar.md (the sidebar defination)
|       └── README.md  (the entry page for docsify)
|
├── js (all javascript used in multiple pages) 
|   └── ...  
|
├── stylesheet (ll stylesheets used in multiple pages)  
|   ├── css  
|   |   └── ...  
|   └── less  
|       └── ...  
|
├── index.html (the entry page for the whole website)
├── LICENSE  
└── .nojekyll  
```