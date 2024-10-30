# Demo Unsplash Gallery

## Prerequisites

You must have the following installed on your machine:

- Node.JS
- PNPM
- Git

## Run the demo

### Get the code & install dependencies

1. Clone this repository and enter the project directory

   ```sh
   git clone https://github.com/TeChn4K/unsplash-gallery.git
   cd unsplash-gallery
   ```

2. Install dependencies

   ```env
   pnpm install
   ```

### Fill in the Unsplash API key

1. In order to use the Unsplash API, you need to create an account and get an access key.

2. Create a `.env` file in the root directory of the project and add your access key:

   ```env
   VITE_UNSPLASH_ACCESS_KEY=<your-access-key>
   ```

### Run the app

1. Build the app

   ```sh
   pnpm run build
   ```

2. Start the app

   ```sh
   pnpm run serve
   ```

3. Open your browser and navigate to `http://localhost:4173/`

## Development

1. Start the app in development mode

   ```sh
   pnpm run dev
   ```

2. Open your browser and navigate to `http://localhost:3001/`
