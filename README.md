# Custom feed template

## How to get my custom feed running asap? 

1. Clone this repo

```bash
git clone https://github.com/BenjaminLesne/custom-feed-template.git
```

2. Deploy the repo to a VPS

3. Push your schemas to the database

```bash
pnpm run db:push
```

3. Provide the env variables (see .env.example)
4. Start the app

```bash
pnpm run start
```

5. Publish your feed to Bluesky

```bash
pnpm run publish
```

6. Search for your feed in [Bluesky feeds](https://bsky.app/feeds)

```text
My custom feed
```

7. Enjoy your feed

For more details see the [`How to code a custom bluesky feed?`](https://blog.benjamin-lesne.dev/blog/How-to-code-a-custom-bluesky-feed) blog post


### Useful links:

- [Get your did here](https://bsky-did.neocities.org/)
- [Create an Bluesky App password here](https://bsky.app/settings/app-passwords)