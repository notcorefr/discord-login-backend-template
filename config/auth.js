const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const User = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

passport.use(
    new DiscordStrategy(
      {
        clientID: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
        callbackURL: process.env.DISCORD_CALLBACK_URL,
        scope: ['identify'],
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log('Profile ID:', profile.id);
        console.log('Profile Username:', profile.username);
        console.log('Profile Discriminator:', profile.discriminator);
        console.log('Profile Avatar:', profile.avatar);
  
        const { id, username, discriminator, avatar } = profile;
        const newUser = {
          discordId: id,
          username,
          discriminator,
          avatar: avatar || null,
          accessToken,
          refreshToken,
        };
  
        try {
          let user = await User.findOne({ discordId: id });
  
          if (user) {
            user = await User.findOneAndUpdate({ discordId: id }, newUser, {
              new: true,
            });
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.error(err);
          done(err, null);
        }
      }
    )
  );
  