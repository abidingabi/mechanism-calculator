all: dist/ dist/math

dist/math: math/*.org dist/
	mkdir -p dist/math
	emacs math/*.org -Q --batch -f org-html-export-to-html --kill
	mv math/*.html dist/math

dist/: src/generated/ tools/
	npm run check
	npm run build

src/generated/:
	mkdir -p src/generated/
	emacs math/*.org -Q --batch -f org-babel-tangle --kill

tools/: index.html
	mkdir -p tools/motor
	cp index.html tools/*
