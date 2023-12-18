generate-types:
	yarn workspace api prisma:generate

migrations:
	yarn workspace api prisma:migrate:dev
