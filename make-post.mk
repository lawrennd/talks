%.posts.html.markdown: %.md ${DEPS}
	${PP} $< -o $@ --format notes --to html --code sparse --replace-notation --edit-links --exercises ${PPFLAGS} 

${BASE}.posts.html: ${BASE}.posts.html.markdown
	pandoc --template pandoc-jekyll-talk-template ${PDSFLAGS} \
	       --atx-headers \
	       ${POSTFLAGS} \
               --to html \
               --out ${BASE}.posts.html  ${BASE}.posts.html.markdown 
	cp ${BASE}.posts.html ${POSTDIR}/${OUT}.html

