all: out/math generated/

out/math: math/*.org
	mkdir -p out/math
	emacs math/*.org -Q --batch -f org-html-export-to-html --kill
	mv math/*.html out/math

generated/: out/math
	mkdir -p src/generated/
	emacs math/*.org -Q --batch -f org-babel-tangle --kill
