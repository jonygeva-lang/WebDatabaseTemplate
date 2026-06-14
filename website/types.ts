export type User = {
  id: number,
  username: string,
};

export type WinGame = {
    time: number;
    moves: number;
    user: {
        username: string;
    };
};

export type LeaderboardEntry =
{
    username: User;
    time: number;
    moves: number;
    score: number;
}