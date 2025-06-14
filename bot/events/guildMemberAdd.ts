import {
  ChannelType,
  Client,
  PermissionsBitField,
  TextChannel,
  GuildMember,
} from "discord.js";
import { DateTime } from "luxon";
import { supabase } from "../lib/client-supabase";

export default async function guildMemberAdd(
  member: GuildMember,
  client: Client
) {
  if (member.guild.id !== process.env.DISCORD_GUILD_ID) return;

  const { data: tickets, error } = await supabase
    .from("watch_party_tickets")
    .select("*")
    .eq("status", "pending");

  if (error || !tickets?.length) return console.log("No pending tickets");

  const usedTicket = tickets[0];

  if (!usedTicket) {
    console.log(`👤 No pending ticket found for ${member.user.id}`);
    return;
  }

  const { error: updateError } = await supabase
    .from("watch_party_tickets")
    .update({
      guest_discord_id: member.user.id,
      status: "joined",
    })
    .eq("id", usedTicket.id);

  if (updateError) {
    console.error("❌ Failed to update ticket:", updateError.message);
    return;
  }

  const hostMember = await member.guild.members
    .fetch(usedTicket.host_discord_id)
    .catch(() => null);

  const permissionOverwrites = [
    {
      id: member.guild.roles.everyone, // 🔒 no ViewChannel
      deny: [PermissionsBitField.Flags.ViewChannel],
    },
    {
      id: member.id, // guest
      allow: [
        PermissionsBitField.Flags.ViewChannel,
        PermissionsBitField.Flags.SendMessages,
        PermissionsBitField.Flags.ReadMessageHistory,
      ],
    },
    ...(hostMember // host
      ? [
          {
            id: hostMember.id,
            allow: [
              PermissionsBitField.Flags.ViewChannel,
              PermissionsBitField.Flags.SendMessages,
              PermissionsBitField.Flags.ManageMessages,
              PermissionsBitField.Flags.ReadMessageHistory,
            ],
          },
        ]
      : []),
    {
      id: client.user!.id,
      allow: [
        PermissionsBitField.Flags.ViewChannel,
        PermissionsBitField.Flags.SendMessages,
      ],
    },
  ];

  const textChannel = await member.guild.channels.create({
    name: `💞-${usedTicket.host_name}-${usedTicket.guest_name}`,
    type: ChannelType.GuildText,
    permissionOverwrites,
  });

  const voiceChannel = await member.guild.channels.create({
    name: `🎬 - ${usedTicket.movie_title}`,
    type: ChannelType.GuildVoice,
    permissionOverwrites: [
      {
        id: member.guild.roles.everyone, // 👈 allow random users to see and connect
        allow: [
          PermissionsBitField.Flags.ViewChannel,
          PermissionsBitField.Flags.Connect,
        ],
        deny: [
          PermissionsBitField.Flags.Speak,
          PermissionsBitField.Flags.Stream,
        ],
      },
      {
        id: member.id, // ✅ guest
        allow: [
          PermissionsBitField.Flags.Connect,
          PermissionsBitField.Flags.Speak,
          PermissionsBitField.Flags.Stream,
        ],
      },
      ...(hostMember
        ? [
            {
              id: hostMember.id, // ✅ host
              allow: [
                PermissionsBitField.Flags.Connect,
                PermissionsBitField.Flags.Speak,
                PermissionsBitField.Flags.Stream,
              ],
            },
          ]
        : []),
      {
        id: client.user!.id, // ✅ bot
        allow: [
          PermissionsBitField.Flags.Connect,
          PermissionsBitField.Flags.Speak,
          PermissionsBitField.Flags.Stream,
        ],
      },
    ],
  });

  // BOT DM: Notify host about guest joining
  if (hostMember) {
    hostMember
      .send(
        `🎉 Your guest **${usedTicket.guest_name}** has joined your private movie night!\n\n` +
          `**Movie:** ${usedTicket.movie_title}\n` +
          `**Date:** ${usedTicket.date}\n**Time:** ${usedTicket.time}\n` +
          `**Runtime:** ${usedTicket.movie_duration} minutes\n\n` +
          `**Movie Link:** ${usedTicket.movie_url}\n\n` +
          `Get ready to start the movie on time. You can chat with your guest in the private text channel and join the voice room when it starts. Enjoy! 🍿`
      )
      .catch(() => {
        console.warn(`⚠️ Could not DM host ${hostMember.user.tag}`);
      });
  }

  const loungeChannel = member.guild.channels.cache.find(
    (c) => c.name === "watch-party-lounge" && c.type === ChannelType.GuildText
  ) as TextChannel;

  loungeChannel?.send(
    `💘 A new **private movie date** just kicked off! \n\n` +
      `Movie: **${usedTicket.movie_title}**\n` +
      `Date: **${usedTicket.date}** \n` +
      `Time: **${usedTicket.time}**\n` +
      `Runtime: **${usedTicket.movie_duration} minutes**\n` +
      `Host: **${usedTicket.host_name}** \n` +
      `Guest: **${usedTicket.guest_name}** \n\n` +
      `You *can* peek in the voice room — but shhh... you're muted, and no cams allowed! \n` +
      `\nLet the sparks fly and the popcorn pop! 🍿💫`
  );

  // BOT MESSAGE: Send welcome message to guess and host in the private text channel
  await textChannel.send({
    content:
      `👋 Welcome <@${member.id}> and <@${usedTicket.host_discord_id}>! This is your private watch party channel for **${usedTicket.movie_title}**.\n\n` +
      `**Date:** ${usedTicket.date}\n**Time:** ${usedTicket.time}\n` +
      `**Runtime:** ${usedTicket.movie_duration} minutes\n\n` +
      `Use the following commands:\n🎫 \`/ticket\` — View your ticket\n🔔 \`/remind\` — Set a reminder\n\nEnjoy the movie! 🍿`,
  });

  // BOT DM: Notify guest about their private channel
  member
    .send(
      `🎉 You've been invited by **${usedTicket.host_name}** to a private movie night!\n\n` +
        `**Movie:** ${usedTicket.movie_title}\n` +
        `**Date:** ${usedTicket.date}\n` +
        `**Time:** ${usedTicket.time}\n` +
        `**Runtime:** ${usedTicket.movie_duration} minutes\n\n` +
        `Get ready to start the movie on time. You can chat with your host in the private text channel and join the voice room when it starts. Enjoy! 🍿`
    )
    .catch(() => {
      console.warn(`⚠️ Could not DM guest ${member.user.tag}`);
    });

  // Schedule cleanup after movie ends + 15 minutes
  const duration = usedTicket.movie_duration * 60 * 1000;
  setTimeout(() => {
    textChannel.delete().catch(console.error);
    voiceChannel.delete().catch(console.error);
  }, duration + 15 * 60 * 1000);

  // Reminder 1 hour before movie
  const movieDateTime = DateTime.fromFormat(
    `${usedTicket.date} ${usedTicket.time}`,
    "yyyy-MM-dd h:mm a",
    { zone: "Asia/Manila" }
  );

  if (!movieDateTime.isValid) {
    return console.error(
      "❌ Invalid movie datetime:",
      usedTicket.date,
      usedTicket.time
    );
  }

  const oneHourBefore = movieDateTime.minus({ hours: 1 });
  const now = DateTime.now().setZone("Asia/Manila");

  const delay = oneHourBefore.toMillis() - now.toMillis();

  console.log(
    `⏰ Scheduling reminder in ${delay / 1000}s for ${member.user.tag}`
  );

  if (delay > 0) {
    setTimeout(async () => {
      const chan = member.guild.channels.cache.get(
        textChannel.id
      ) as TextChannel;
      if (chan) {
        chan.send(
          `⏰ <@${member.id}> Reminder: Your movie **${usedTicket.movie_title}** starts in 1 hour! 🍿`
        );
      }

      member
        .send(
          `⏰ Reminder: Your movie **${usedTicket.movie_title}** starts in 1 hour!\nJoin your private channel: #${textChannel.name}`
        )
        .catch(() => {
          console.warn(`⚠️ Could not DM reminder to ${member.user.tag}`);
        });
    }, delay);
  }
}
