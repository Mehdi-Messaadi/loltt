import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLFloat,
  GraphQLSchema,
} from "graphql";
import axios from "axios";

import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.API_KEY;

// Define the BanType GraphQL object
const BanType = new GraphQLObjectType({
  name: "Ban",
  fields: () => ({
    championId: { type: GraphQLInt },
    pickTurn: { type: GraphQLInt },
  }),
});

// Define the ObjectiveType GraphQL object
const ObjectiveType = new GraphQLObjectType({
  name: "Objective",
  fields: () => ({
    first: { type: GraphQLBoolean },
    kills: { type: GraphQLInt },
  }),
});

// Define the TeamType GraphQL object
const TeamType = new GraphQLObjectType({
  name: "Team",
  fields: () => ({
    teamId: { type: GraphQLInt },
    win: { type: GraphQLBoolean },
    bans: { type: new GraphQLList(BanType) },
    objectives: {
      type: new GraphQLObjectType({
        name: "Objectives",
        fields: () => ({
          baron: { type: ObjectiveType },
          champion: { type: ObjectiveType },
          dragon: { type: ObjectiveType },
          inhibitor: { type: ObjectiveType },
          riftHerald: { type: ObjectiveType },
          tower: { type: ObjectiveType },
        }),
      }),
    },
  }),
});

// Define the PerkType GraphQL object
const PerkType = new GraphQLObjectType({
  name: "Perk",
  fields: () => ({
    statPerks: {
      type: new GraphQLObjectType({
        name: "StatPerks",
        fields: () => ({
          defense: { type: GraphQLInt },
          flex: { type: GraphQLInt },
          offense: { type: GraphQLInt },
        }),
      }),
    },
    styles: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: "PerkStyle",
          fields: () => ({
            description: { type: GraphQLString },
            selections: {
              type: new GraphQLList(
                new GraphQLObjectType({
                  name: "PerkSelection",
                  fields: () => ({
                    perk: { type: GraphQLInt },
                    var1: { type: GraphQLInt },
                    var2: { type: GraphQLInt },
                    var3: { type: GraphQLInt },
                  }),
                })
              ),
            },
            style: { type: GraphQLInt },
          }),
        })
      ),
    },
  }),
});

// Define the ParticipantType GraphQL object
const ParticipantType = new GraphQLObjectType({
  name: "Participant",
  fields: () => ({
    allInPings: { type: GraphQLInt },
    assistMePings: { type: GraphQLInt },
    assists: { type: GraphQLInt },
    baronKills: { type: GraphQLInt },
    basicPings: { type: GraphQLInt },
    bountyLevel: { type: GraphQLInt },
    challenges: {
      type: new GraphQLObjectType({
        name: "Challenges",
        fields: () => ({
          damagePerMinute: { type: GraphQLFloat },
          damageTakenOnTeamPercentage: { type: GraphQLFloat },
          deathsByEnemyChamps: { type: GraphQLInt },
          dodgeSkillShotsSmallWindow: { type: GraphQLInt },
          goldPerMinute: { type: GraphQLFloat },
          kda: { type: GraphQLFloat },
          killParticipation: { type: GraphQLFloat },
          kills: { type: GraphQLInt },
          laneMinionsFirst10Minutes: { type: GraphQLInt },
          visionScorePerMinute: { type: GraphQLFloat },
          wardTakedowns: { type: GraphQLInt },
        }),
      }),
    },
    champExperience: { type: GraphQLInt },
    champLevel: { type: GraphQLInt },
    championId: { type: GraphQLInt },
    championName: { type: GraphQLString },
    damageDealtToBuildings: { type: GraphQLInt },
    damageDealtToObjectives: { type: GraphQLInt },
    damageDealtToTurrets: { type: GraphQLInt },
    damageSelfMitigated: { type: GraphQLInt },
    deaths: { type: GraphQLInt },
    goldEarned: { type: GraphQLInt },
    goldSpent: { type: GraphQLInt },
    individualPosition: { type: GraphQLString },
    item0: { type: GraphQLInt },
    item1: { type: GraphQLInt },
    item2: { type: GraphQLInt },
    item3: { type: GraphQLInt },
    item4: { type: GraphQLInt },
    item5: { type: GraphQLInt },
    item6: { type: GraphQLInt },
    itemsPurchased: { type: GraphQLInt },
    kills: { type: GraphQLInt },
    lane: { type: GraphQLString },
    largestCriticalStrike: { type: GraphQLInt },
    largestKillingSpree: { type: GraphQLInt },
    largestMultiKill: { type: GraphQLInt },
    longestTimeSpentLiving: { type: GraphQLInt },
    magicDamageDealt: { type: GraphQLInt },
    magicDamageDealtToChampions: { type: GraphQLInt },
    magicDamageTaken: { type: GraphQLInt },
    neutralMinionsKilled: { type: GraphQLInt },
    profileIcon: { type: GraphQLInt },
    puuid: { type: GraphQLString },
    role: { type: GraphQLString },
    sightWardsBoughtInGame: { type: GraphQLInt },
    spell1Casts: { type: GraphQLInt },
    spell2Casts: { type: GraphQLInt },
    spell3Casts: { type: GraphQLInt },
    spell4Casts: { type: GraphQLInt },
    summoner1Casts: { type: GraphQLInt },
    summoner2Casts: { type: GraphQLInt },
    summonerId: { type: GraphQLInt },
    summonerName: { type: GraphQLString },
    teamId: { type: GraphQLInt },
    teamPosition: { type: GraphQLString },
    totalDamageDealtToChampions: { type: GraphQLInt },
    totalDamageTaken: { type: GraphQLInt },
    totalMinionsKilled: { type: GraphQLInt },
    totalTimeSpentDead: { type: GraphQLInt },
    visionScore: { type: GraphQLInt },
    wardTakedowns: { type: GraphQLInt },
    wardsPlaced: { type: GraphQLInt },
    perks: { type: PerkType },
  }),
});

// Define the MetadataType GraphQL object
const MetadataType = new GraphQLObjectType({
  name: "Metadata",
  fields: () => ({
    dataVersion: { type: GraphQLString },
    matchId: { type: GraphQLString },
    participants: { type: new GraphQLList(GraphQLString) }, // Participants as JSON strings
  }),
});

// Define the InfoType GraphQL object
const InfoType = new GraphQLObjectType({
  name: "Info",
  fields: () => ({
    gameCreation: { type: GraphQLFloat },
    gameDuration: { type: GraphQLFloat },
    gameEndTimestamp: { type: GraphQLFloat },
    gameId: { type: GraphQLString },
    gameMode: { type: GraphQLString },
    gameName: { type: GraphQLString },
    gameStartTimestamp: { type: GraphQLFloat },
    gameType: { type: GraphQLString },
    gameVersion: { type: GraphQLString },
    mapId: { type: GraphQLInt },
    platformId: { type: GraphQLString },
    queueId: { type: GraphQLInt },
    teams: { type: new GraphQLList(TeamType) },
    tournamentCode: { type: GraphQLString },
    participants: { type: new GraphQLList(ParticipantType) }, // Updated to ParticipantType
  }),
});

// Define the MatchDetailsType GraphQL object for detailed match info
const MatchDetailsType = new GraphQLObjectType({
  name: "MatchDetails",
  fields: () => ({
    id: { type: GraphQLString },
    metadata: { type: MetadataType },
    info: { type: InfoType }, // Add the InfoType here
  }),
});

// Define the MatchType GraphQL object for match details
const MatchType = new GraphQLObjectType({
  name: "Match",
  fields: () => ({
    id: { type: GraphQLString },
    metadata: { type: MetadataType },
    info: { type: InfoType },
  }),
});

// Define the AccountType GraphQL object
const AccountType = new GraphQLObjectType({
  name: "Account",
  fields: () => ({
    puuid: { type: GraphQLString },
    gameName: { type: GraphQLString },
    tagLine: { type: GraphQLString },
    matches: {
      type: new GraphQLList(MatchType),
      resolve: async (parent) => {
        const regions = ["americas", "europe", "asia", "sea"];
        const matchPromises = regions.map(async (region) => {
          try {
            const response = await axios.get(
              `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${parent.puuid}/ids`,
              {
                headers: {
                  "X-Riot-Token": API_KEY,
                },
              }
            );
            return response.data.map((matchId) => ({ id: matchId }));
          } catch (error) {
            console.error(
              `Failed to fetch matches for region ${region}`,
              error
            );
            return [];
          }
        });

        // Combine all match lists
        const matches = (await Promise.all(matchPromises)).flat();
        return matches;
      },
    },
  }),
});

// Define RootQuery with the account and match fields
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    account: {
      type: AccountType,
      args: {
        gameName: { type: GraphQLString },
        tagLine: { type: GraphQLString },
      },
      async resolve(parent, args) {
        try {
          // Make API request to Riot's account API using axios
          const response = await axios.get(
            `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${args.gameName}/${args.tagLine}`,
            {
              headers: {
                "X-Riot-Token": API_KEY,
              },
            }
          );
          const accountData = response.data;
          return {
            puuid: accountData.puuid,
            gameName: accountData.gameName,
            tagLine: accountData.tagLine,
          };
        } catch (error) {
          console.error(error);
          throw new Error("Failed to fetch account");
        }
      },
    },
    match: {
      type: MatchDetailsType,
      args: {
        matchId: { type: GraphQLString },
        region: { type: GraphQLString },
      },
      async resolve(parent, args) {
        try {
          const response = await axios.get(
            `https://${args.region}.api.riotgames.com/lol/match/v5/matches/${args.matchId}`,
            {
              headers: {
                "X-Riot-Token": "RGAPI-d369995b-ef1a-49df-9783-fb370c5d83f0",
              },
            }
          );
          const matchDetails = response.data;

          return {
            id: matchDetails.metadata.matchId,
            metadata: {
              dataVersion: matchDetails.metadata.dataVersion,
              matchId: matchDetails.metadata.matchId,
              participants: Array.isArray(matchDetails.metadata.participants)
                ? matchDetails.metadata.participants
                : [], // Ensure it's an array
            },
            info: {
              gameCreation: matchDetails.info.gameCreation,
              gameDuration: matchDetails.info.gameDuration,
              gameEndTimestamp: matchDetails.info.gameEndTimestamp,
              gameId: matchDetails.info.gameId,
              gameMode: matchDetails.info.gameMode,
              gameName: matchDetails.info.gameName,
              gameStartTimestamp: matchDetails.info.gameStartTimestamp,
              gameType: matchDetails.info.gameType,
              gameVersion: matchDetails.info.gameVersion,
              mapId: matchDetails.info.mapId,
              platformId: matchDetails.info.platformId,
              queueId: matchDetails.info.queueId,
              teams: Array.isArray(matchDetails.info.teams)
                ? matchDetails.info.teams
                : [], // Ensure it's an array
              tournamentCode: matchDetails.info.tournamentCode,
              participants: Array.isArray(matchDetails.info.participants)
                ? matchDetails.info.participants
                : [], // Ensure it's an array
            },
          };
        } catch (error) {
          console.error(
            `Failed to fetch match details for match ID ${args.matchId}`,
            error
          );
          throw new Error("Failed to fetch match details");
        }
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
});
