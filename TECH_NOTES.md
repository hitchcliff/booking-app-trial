# How to run

1. Create DATABASE and name it `booking-test`
2. cd to `./server` then run `yarn dev` make sure to run `yarn install` first to install deps
3. cd to `./web` then run `yarn dev` make sure to run `yarn install` first to install the deps

# Accounts

1. admin account:

- email: admin@email.com pw:123456
- email: user@email.com pw:123456
- email: user2@email.com pw:123456

P.S. If you encounter database errors which usually happen when `postgres` is not installed in your local.
you can use the postgres database in vscode :)

# Outline

– What was built
A booking application prioritizing the requirements based on the docs however I didn't make it in time. Anyways, this app is built from Express with Apollo Graphql middleware in the backend and NextJS in the frontend.

– Reasoning behind your approach
I am making it as scalaeable, maintainable for long term development to production. This setup is generic and can be use for other uses. I used Firebase Auth to make authentication more secure, because I preffered not showing the session in the browser. This app also uses cache to validate/invalidate data. Everything is strictly typed except the `enums` in the backend which supposedly registered in schema and can be use in the frontend.

– Assumptions made
For now, I dont have assumptions I made based on the requirements

– Potential improvements
File uploads,

– How AI assisted your workflow
Unfortunately, I don't use AI to sped up my work but if Google AI counts then that's the one I used everytime I ran into problems unheard of.
