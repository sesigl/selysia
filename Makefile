pre-commit:
	cd infrastructure-sesigl && terraform fmt
	cd apps/frontend && npx eslint --fix && npx tsc
