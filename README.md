# LoLTT (League of Legends Tracker Tool)

LoLTT is a web application that allows users to search and view detailed match information for a player in League of Legends. By entering the player's Game Name, Tag Line, and selecting the region, users can quickly access a list of their most recent matches and drill down into specific match details.

## Table of Contents
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Usage](#usage)

## Getting Started

To get a local copy of this project up and running, follow these instructions.

### Prerequisites

Before starting, ensure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- A [Riot Games Developer Account](https://developer.riotgames.com/)

### Installation

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/Mehdi-Messaadi/loltt.git
    ```

2. Change into the project directory:

    ```bash
    cd .\loltt\
    ```

## Configuration

1. **Obtain your Riot Games API key**:

   - Visit the [Riot Developer Portal](https://developer.riotgames.com/).
   - Connect with your Riot account.
   - Navigate to the "Support" page (if you're not redirected automatically).
   - At the bottom of the page, complete the Captcha and regenerate your **API KEY**.

2. **Configure the project**:

   - In the project directory, navigate to `src/backend/.env`.
   - Open the `.env` file and paste your **API KEY** between the quotes like so:

    ```bash
    RIOT_API_KEY="YOUR_API_KEY"
    ```

   - Next, open the `Dockerfile` located in the root folder, and replace the placeholder with your API KEY value as required.

## Running the Application

1. Build the Docker image:

    ```bash
    docker build -t my-app .
    ```

2. Run the Docker container:

    ```bash
    docker run -p 3000:3000 -p 4000:4000 my-app
    ```

3. The application should now be running locally. Open your browser and navigate to:

    ```
    http://localhost:3000/
    ```

## Usage

1. Enter the **Game Name** and **Tag Line** of the player whose latest matches you want to retrieve.
2. Select the appropriate region from the dropdown.
3. Click on the **Search Matches** button.
4. Wait for a few seconds for the matches to load.
5. Click on any match to view detailed statistics, including team and participant information.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Acknowledgments

- [Riot Games API](https://developer.riotgames.com/) for providing access to game data.
