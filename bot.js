const mineflayer = require('mineflayer');

const config = {
  host: 'survivaldepanchos.mcsh.io',
  port: 25565,
  username: 'Raboot_356',
  version: false
};

let bot;
let reconnecting = false;

function createBot() {
  console.log('Conectando a Minecraft...');

  bot = mineflayer.createBot(config);

  bot.once('spawn', () => {
    console.log('✅ Raboot_356 está conectado');

    // Mantener al bot activo
    bot.setControlState('forward', false);
    bot.setControlState('back', false);
    bot.setControlState('left', false);
    bot.setControlState('right', false);
    bot.setControlState('jump', false);
    bot.setControlState('sprint', false);
  });

  bot.on('chat', (username, message) => {
    console.log(`[CHAT] ${username}: ${message}`);
  });

  bot.on('kicked', (reason) => {
    console.log('⚠️ El bot fue expulsado:', reason);
  });

  bot.on('error', (err) => {
    console.log('❌ Error:', err.message);
  });

  bot.on('end', () => {
    if (reconnecting) return;

    reconnecting = true;
    console.log('🔄 Desconectado. Intentando reconectar en 10 segundos...');

    setTimeout(() => {
      reconnecting = false;
      createBot();
    }, 10000);
  });
}

createBot();

// Evita que GitHub termine el proceso por un error inesperado
process.on('uncaughtException', (err) => {
  console.log('⚠️ Error inesperado:', err.message);
});

process.on('unhandledRejection', (err) => {
  console.log('⚠️ Promesa rechazada:', err);
});
