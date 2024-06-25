-- Create the JimBot database
CREATE DATABASE JimBot;
-- Switch to the JimBot database
\ c JimBot;
-- Create the GuildScheduledEvent table
CREATE TABLE GuildScheduledEvent (
    id TEXT PRIMARY KEY,
    guildId TEXT,
    channelId TEXT,
    name TEXT,
    description TEXT,
    scheduledStartTimestamp BIGINT,
    scheduledEndTimestamp BIGINT,
    privacyLevel INT,
    entityType INT
);
-- Optional: Add an index on the guildId column for faster queries
CREATE INDEX idx_guildId ON GuildScheduledEvent(guildId);