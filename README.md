# React Movie CA2

[React][react] SPA for movie browsing and reviewing, using the
[*"The Movie Database (TMDb)"*][tmdb-key] API.

**Made by:** Piotr Placzek (20097618)

## Features (new)

### CA2

- [x] Added movies-api from labs.
- [x] Added MongoDB "reviews" collection.
- [x] Added Create, Read and Delete endpoints in movies-api for "reviews" collection.
- [x] Changed the app to use MongoDB instead of Supabase for storing reviews.
- [x] Added username regex validation in app and movies-api.
- [x] Added login and sign-up pages from labs (changed to use MUI).
- [x] Added feedback/error message display on login and sign-up pages.
- [x] Moved all TMDB API calls to movies-api

### CA1

- [x] Updated from React Query v3 (outdated) to [TanStack Query][tanstack] v5.
- [x] Switched from CRA (Webpack) to [Vite][vite] ([much faster and better][web-to-vit]).
- [x] Added [Supabase][supa] for ***user authentication*** and ***storing user reviews***.
- [x] Added trending and top rated movie pages.
- [x] Added ***pagination*** for home (discover), upcoming and top rated movie pages.
- [x] Added list of cast members to movie page (links to that cast member's page).
- [x] Added details page for cast members (includes list of their movies with links).
- [x] Added ability to search movies by overview text
- [x] Added ability to filter movies by original language and release year range.
  - [x] The release year range filter uses the [Slider] component.
- [x] Added ability to sort movies asc/desc by popularity, rating, and release year.
- [x] Replaced rating dropdown with [Rating][rating] component in review form.
- [x] Switched to using Dark Mode for nicer aesthetics.

## Usage

> [!NOTE]
> You will need to provide [your own TMDb API key][tmdb-key].

```bash
cd ./react-movie-ca1 # or ./movies-api (same commands)

# Install dependencies
npm install

# Add env vars (only in movies-api)
nano .env.template
mv .env.template .env

# Run app/movies-api
npm run dev
```

## Development

> [!NOTE]
> I recommend [installing `pre-commit`][pre-commit] to use the provided Git hooks.

```bash
# Install pre-commit hooks
pre-commit install

cd ./react-movie-ca1 # or ./movies-api (same commands)

# Start dev server
npm run dev

# Lint (also includes Prettier)
npm run lint

# Build for production
npm run build
```

## API endpoints (new)

> [!NOTE]
> All of these endpoints are cached using TanStack Query.

### CA2

(All of the CA1 endpoints were updated to use the movies-api)

| Endpoint                      | Description                           |
|-------------------------------|---------------------------------------|
| `/api/reviews/movie/:id`      | READ MongoDB Reviews for Movie        |
| `/api/users`                  | Users (Sign-in and Sign-up)           |
| `/api/reviews`                | POST MongoDB Reviews                  |
| `/api/reviews/:id`            | DELETE MongoDB Reviews                |


### CA1

| Endpoint                      | Description                           |
|-------------------------------|---------------------------------------|
| `/trending/movie/day`         | Trending Movies                       |
| `/movie/top_rated`            | Top Rated Movies                      |
| `/movie/:id/credits`          | Movie Credits (People/Cast)           |
| `/person/:id`                 | Person/Cast Member Details            |
| `/person/:id/movie_credits`   | Movies involving Person/Cast Member   |
| `/configuration/languages`    | TMDB Language List                    |

## Routing (new)

> [!NOTE]
> These are the protected routes i.e. only a signed-in user can access them:
>
> - `/reviews/form`
> - `/movies/favorites`
> - `/movies/to-watch`

### CA2

| Route                 | Description                   |
|-----------------------|-------------------------------|
| `/login`              | Login                         |
| `/signup`             | Sign-up                       |

### CA1


| Route                 | Description                   |
|-----------------------|-------------------------------|
| `/movies/trending`    | Trending Movies               |
| `/movies/top-rated`   | Top Rated Movies              |
| `/person/:id`         | Person/Cast Member Details    |

## Licenses

This project is licensed under the [GNU GPL v3.0][license].

Based on the following course material:

```txt
╔══════════════════════════════════════════════╗
║ "React Movie App" Labs                       ║
╠══════════════════════════════════════════════╣
║ Web App Development 2                        ║
║ BSc (Hons.) Software Systems Development     ║
║ South East Technological University          ║
║                                              ║
║ Lecturer: Rosanne Birney (rbirney@wit.ie)    ║
╚══════════════════════════════════════════════╝
```

Made using the following resources:

| Resource                                  | License                           |
|:------------------------------------------|:----------------------------------|
| [CRA to Vite guide][cra-vite]             | N/A                               |
| [`.js` to `.jsx` script][js-jsx]          | N/A                               |
| [Vite usage guide][vite-guide]            | [MIT][vite-license]               |
| [Supabase React quickstart][supa-start]   | [Apache 2.0][supa-license]        |
| [WebGradients][gradient]                  | N/A[^1]                           |

[^1]: *"Free for commercial or personal use by [Dima Braven][dima]"*.

[react]: https://react.dev/
[tanstack]: https://tanstack.com/query/latest
[vite]: https://vite.dev/
[web-to-vit]: https://javascript.plainenglish.io/why-you-should-not-use-webpack-f07f4fd7c116
[pre-commit]: https://pre-commit.com/#install
[tmdb-key]: https://developer.themoviedb.org/docs/getting-started
[supa]: https://supabase.com/
[slider]: https://mui.com/material-ui/react-slider/#range-slider
[rating]: https://mui.com/material-ui/react-rating/
[setup.sql]: ./setup.sql
[license]: ./LICENSE
[cra-vite]: https://medium.com/@mun1013/guide-to-migrating-from-create-react-app-cra-to-vite-5516f55aa410
[js-jsx]: https://gist.github.com/parties/90cdf35f9a3d05bea6df76dc83a69641
[vite-guide]: https://vite.dev/guide/
[vite-license]: https://github.com/vitejs/vite/blob/main/LICENSE
[supa-start]: https://supabase.com/docs/guides/auth/quickstarts/react
[supa-license]: https://github.com/supabase/supabase/blob/master/LICENSE
[gradient]: https://webgradients.com/
[dima]: https://twitter.com/dimabraven
