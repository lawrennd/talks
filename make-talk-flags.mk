# This file checks the header of the base file for information about how to produce the talk and stores it in relevant files.

# Extract the date and the prefix of the produced files.
DATE=$(shell ../talkfield.py date ${BASE}.md)

CATEGORIES=$(shell ../talkfield.py categories ${BASE}.md)

MATHJAX="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS-MML_SVG"
REVEALJS="https://inverseprobability.com/talks/slides/reveal.js/"

SLIDESHEADER=$(shell ../talkfield.py slidesheader ${BASE}.md)
POSTSHEADER=$(shell ../talkfield.py postssheader ${BASE}.md)
ASSIGNMENT=$(shell ../talkfield.py assignment ${BASE}.md)
NOTATION=$(shell ../talkfield.py notation ${BASE}.md)

PREFIX=$(shell ../flags.py prefix ${BASE})

# Local calls for the preprocessor and inkscape
INKSCAPE=inkscape #/Applications/Inkscape.app/Contents/Resources/bin/inkscape
PP=../mdpp.py

PPFLAGS=-T 
PPFLAGS=$(shell ../flags.py pp $(BASE))

BIBFLAGS=--bibliography=../lawrence.bib --bibliography=../other.bib --bibliography=../zbooks.bib 

CITEFLAGS=--citeproc --csl=../elsevier-harvard.csl ${BIBFLAGS}

PDSFLAGS=-s ${CITEFLAGS} --mathjax=${MATHJAX} 

POSTDIR=$(shell ../talkfield.py postdir $(BASE).md)
NOTEDIR=$(shell ../talkfield.py notedir $(BASE).md)
NOTEBOOKDIR=$(shell ../talkfield.py notebookdir $(BASE).md)
SLIDEDIR=$(shell ../talkfield.py slidedir $(BASE).md)
WEEK=$(shell ../talkfield.py week $(BASE).md)
SESSION=$(shell ../talkfield.py session $(BASE).md)



DEPS=$(shell ../dependencies.py inputs $(BASE).md)
DIAGDEPS=$(shell ../dependencies.py diagrams $(BASE).md)
BIBDEPS=$(shell ../dependencies.py bibinputs $(BASE).md)

POSTFLAGS=$(shell ../flags.py post $(BASE))
PPTXFLAGS=$(shell ../flags.py pptx $(BASE))
DOCXFLAGS=$(shell ../flags.py docx $(BASE))
SFLAGS=$(shell ../flags.py reveal $(BASE))


ALL=$(shell ../dependencies.py all $(BASE).md)
