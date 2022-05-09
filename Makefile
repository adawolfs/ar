push-guategeeks:
	git branch -D GuateGeeksAr
	git checkout --orphan GuateGeeksAr
	git add .
	git commit -m "GuateGeeksAr"
	git push -u guategeeks +ar:main
	git checkout main