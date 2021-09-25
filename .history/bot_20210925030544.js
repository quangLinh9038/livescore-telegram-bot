bot.on(["/start", "/hello"], async (msg) => {
  try {
    const results = await getFixtures(options);
    console.log(results);
    return msg.reply.text("results");
  } catch (err) {
    return err;
  }
});

bot.start();
