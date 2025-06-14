export async function createDiscordInvite(
  channelId: string
): Promise<string | null> {
  const url = `https://discord.com/api/v10/channels/${channelId}/invites`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      max_uses: 1,
      unique: true,
      max_age: 86400, // 1 day
      reason: "Watch party invite",
    }),
  });

  if (!res.ok) {
    console.error("Failed to create Discord invite", await res.text());
    return null;
  }

  const data = await res.json();
  return data.code;
}
