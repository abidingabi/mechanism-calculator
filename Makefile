all: site dist/math generated/

site: generated/
	npm run build

generated/: dist/math
	mkdir -p src/generated/
	emacs math/*.org -Q --batch -f org-babel-tangle --kill

dist/math: math/*.org
	mkdir -p dist/math
	emacs math/*.org -Q --batch -f org-html-export-to-html --kill
	mv math/*.html dist/math
