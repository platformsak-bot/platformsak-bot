const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN || '7621774557:AAHIyWJT_9ddx-o5wtCYAAz4qrRUa039JV8';
const bot = new TelegramBot(token, {polling: true});

let userSessions = {};
let waitingForAssignment = {};
let cvData = {};
let cvStep = {};

bot.onText(/↩️ العودة للقائمة الرئيسية/, (msg) => {
  showMainMenu(msg.chat.id);
});

bot.onText(/\/start/, (msg) => {
  showMainMenu(msg.chat.id);
});

function showMainMenu(chatId) {
  const keyboard = {
    reply_markup: {
      keyboard: [
        ['🔍 خدمات الأبحاث'],
        ['📝 حل الواجبات والإمتحانات'],
        ['💼 كتابة السيرة الذاتية'],
        ['🎯 المشاريع الدراسية']
      ],
      resize_keyboard: true
    }
  };
  
  bot.sendMessage(chatId, `مرحباً بك في PlatformSAK! 🎓

خدمات شاملة للطلاب في جميع المجالات التعليمية

اختر الخدمة التي تحتاجها:`, keyboard);
}

bot.onText(/🔍 خدمات الأبحاث/, (msg) => {
  const chatId = msg.chat.id;
  const researchKeyboard = {
    reply_markup: {
      keyboard: [
        ['📄 رؤية أمثلة الأبحاث'],
        ['🆕 طلب بحث جديد'],
        ['↩️ العودة للقائمة الرئيسية']
      ],
      resize_keyboard: true
    }
  };
  
  bot.sendMessage(chatId, `🔍 خدمات الأبحاث والتقارير

اختر ما تريد:
- 📄 رؤية أمثلة لأبحاثنا السابقة
- 🆕 طلب بحث جديد

📧 للتواصل: alslahyamr1@gmail.com
📞 الواتساب: 733071578`, researchKeyboard);
});

bot.onText(/📄 رؤية أمثلة الأبحاث/, (msg) => {
  bot.sendMessage(msg.chat.id, `📚 أمثلة لأبحاثنا:

يمكنك طلب أمثلة PDF عبر:
📧 alslahyamr1@gmail.com 
📞 733071578

وسنرسل لك نماذج مجانية لأبحاثنا السابقة`);
});

bot.onText(/🆕 طلب بحث جديد/, (msg) => {
  const chatId = msg.chat.id;
  userSessions[chatId] = 'research_request';
  bot.sendMessage(chatId, `🆕 طلب بحث جديد

الآن يمكنك إرسال تفاصيل البحث المطلوب:
- عنوان البحث
- عدد الصفحات
- التخصص
- الموعد النهائي
- أي متطلبات خاصة

سيتم إرسال طلبك للمسؤول وسنتواصل معك خلال ساعات`);
});

bot.onText(/📝 حل الواجبات والإمتحانات/, (msg) => {
  const chatId = msg.chat.id;
  const assignmentKeyboard = {
    reply_markup: {
      keyboard: [
        ['📤 إرسال واجب للحل'],
        ['ℹ️ تعليمات الإرسال'],
        ['↩️ العودة للقائمة الرئيسية']
      ],
      resize_keyboard: true
    }
  };
  
  bot.sendMessage(chatId, `📝 خدمة حل الواجبات

لإرسال واجب للحل:
1. اضغط "📤 إرسال واجب للحل"
2. اكتب تفاصيل الواجب
3. أرفق الصور إذا needed
4. اذكر رقم تواصلك

سنقوم بالحل وإرساله لك خلال 24 ساعة`, assignmentKeyboard);
});

bot.onText(/📤 إرسال واجب للحل/, (msg) => {
  const chatId = msg.chat.id;
  waitingForAssignment[chatId] = true;
  bot.sendMessage(chatId, `📤 إرسال الواجب:

الآن يمكنك:
- كتابة تفاصيل الواجب
- إرسال صور الأسئلة
- ذكر المادة والموعد النهائي
- كتابة رقم تواصلك

*سيتم إرسال كل ما تكتبه الآن إلى المسؤول*`);
});

bot.onText(/💼 كتابة السيرة الذاتية/, (msg) => {
  const chatId = msg.chat.id;
  const cvKeyboard = {
    reply_markup: {
      keyboard: [
        ['📝 تعبئة بيانات السيرة الذاتية'],
        ['↩️ العودة للقائمة الرئيسية']
      ],
      resize_keyboard: true
    }
  };
  
  bot.sendMessage(chatId, `💼 خدمات السيرة الذاتية

لإنشاء سيرة ذاتية احترافية:
1. اضغط "📝 تعبئة بيانات السيرة الذاتية"  
2. اتبع الخطوات وأدخل معلوماتك
3. سنقوم بإنشاء CV احترافي لك

📞 للاستفسار: 733071578`, cvKeyboard);
});

bot.onText(/📝 تعبئة بيانات السيرة الذاتية/, (msg) => {
  const chatId = msg.chat.id;
  cvStep[chatId] = 'name';
  cvData[chatId] = {};
  bot.sendMessage(chatId, `📝 بيانات السيرة الذاتية

لنبدأ في تعبئة بياناتك:

الخطوة 1/6: ما هو اسمك الكامل؟`);
});

bot.onText(/🎯 المشاريع الدراسية/, (msg) => {
  const chatId = msg.chat.id;
  const projectKeyboard = {
    reply_markup: {
      keyboard: [
        ['🚀 طلب مشروع جديد'],
        ['↩️ العودة للقائمة الرئيسية']
      ],
      resize_keyboard: true
    }
  };
  
  bot.sendMessage(chatId, `🎯 المشاريع الدراسية

خدمات إعداد المشاريع:
- مشاريع التخرج
- المشاريع العملية
- العروض التقديمية
- التوثيق الكامل

📧 alslahyamr1@gmail.com
📞 733071578`, projectKeyboard);
});

bot.onText(/🚀 طلب مشروع جديد/, (msg) => {
  const chatId = msg.chat.id;
  userSessions[chatId] = 'project_request';
  bot.sendMessage(chatId, `🚀 طلب مشروع جديد

أرسل لنا تفاصيل المشروع:
- نوع المشروع
- المتطلبات
- الموعد النهائي
- أي تفاصيل أخرى

وسنتواصل معك خلال ساعات`);
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text || '';
  const photo = msg.photo;
  
  if (messageText.startsWith('/')) return;
  
  if (userSessions[chatId] === 'research_request') {
    bot.sendMessage(733071578, `🔍 طلب بحث جديد\nرقم التواصل: ${chatId}\n\n${messageText}`);
    bot.sendMessage(chatId, `✅ تم استلام طلب البحث بنجاح!\n\nسنقوم بالتواصل معك خلال ساعات\n📞 للاستفسار: 733071578`);
    delete userSessions[chatId];
    return;
  }
  
  if (userSessions[chatId] === 'project_request') {
    bot.sendMessage(733071578, `🎯 طلب مشروع جديد\nرقم التواصل: ${chatId}\n\n${messageText}`);
    bot.sendMessage(chatId, `✅ تم استلام طلب المشروع بنجاح!\n\nسنقوم بالتواصل معك خلال ساعات\n📞 للاستفسار: 733071578`);
    delete userSessions[chatId];
    return;
  }
  
  if (waitingForAssignment[chatId]) {
    if (photo) {
      bot.sendPhoto(733071578, photo[photo.length - 1].file_id, {
        caption: `📝 واجب جديد\nرقم التواصل: ${chatId}\n\n${messageText}`
      });
    } else {
      bot.sendMessage(733071578, `📝 واجب جديد\nرقم التواصل: ${chatId}\n\n${messageText}`);
    }
    
    bot.sendMessage(chatId, `✅ تم استلام واجبك بنجاح!\n\nسنقوم بالحل ونرسله لك خلال 24 ساعة\n📞 للاستفسار: 733071578`);
    waitingForAssignment[chatId] = false;
    return;
  }
  
  if (cvStep[chatId]) {
    handleCVData(chatId, messageText);
    return;
  }
  
  if (!messageText.includes('خدمات') && !messageText.includes('الواجبات') && !messageText.includes('السيرة')) {
    bot.sendMessage(chatId, `للتواصل المباشر:\n\n📧 alslahyamr1@gmail.com\n📞 733071578\n\nأو اختر إحدى الخدمات من القائمة`);
  }
});

function handleCVData(chatId, messageText) {
  switch(cvStep[chatId]) {
    case 'name':
      cvData[chatId].name = messageText;
      cvStep[chatId] = 'job';
      bot.sendMessage(chatId, `✅ تم حفظ الاسم: ${messageText}\n\nالخطوة 2/6: ما هو تخصصك/المجال المهني؟`);
      break;
      
    case 'job':
      cvData[chatId].job = messageText;
      cvStep[chatId] = 'phone';
      bot.sendMessage(chatId, `✅ تم حفظ التخصص: ${messageText}\n\nالخطوة 3/6: ما هو رقم هاتفك؟`);
      break;
      
    case 'phone':
      cvData[chatId].phone = messageText;
      cvStep[chatId] = 'email';
      bot.sendMessage(chatId, `✅ تم حفظ الرقم: ${messageText}\n\nالخطوة 4/6: ما هو بريدك الإلكتروني؟`);
      break;
      
    case 'email':
      cvData[chatId].email = messageText;
      cvStep[chatId] = 'education';
      bot.sendMessage(chatId, `✅ تم حفظ البريد: ${messageText}\n\nالخطوة 5/6: ما هي مؤهلاتك التعليمية؟`);
      break;
      
    case 'education':
      cvData[chatId].education = messageText;
      cvStep[chatId] = 'experience';
      bot.sendMessage(chatId, `✅ تم حفظ المؤهلات: ${messageText}\n\nالخطوة 6/6: ما هي خبراتك العملية (إن وجدت)؟`);
      break;
      
    case 'experience':
      cvData[chatId].experience = messageText || 'لا توجد خبرات';
      const userData = cvData[chatId];
      
      bot.sendMessage(733071578, `💼 طلب سيرة ذاتية جديد

👤 الاسم: ${userData.name}
🎯 التخصص: ${userData.job}
📞 الهاتف: ${userData.phone}
📧 البريد: ${userData.email}
🎓 المؤهلات: ${userData.education}
💼 الخبرات: ${userData.experience}

رقم التواصل: ${chatId}`);

      bot.sendMessage(chatId, `🎉 تم استلام بياناتك بنجاح!

سنقوم بإعداد سيرتك الذاتية خلال 24 ساعة وسنرسلها لك على:
📞 ${userData.phone}
📧 ${userData.email}

شكراً لثقتك بنا! 🌟`);

      delete cvStep[chatId];
      delete cvData[chatId];
      break;
  }
}

console.log('🚀 بوت PlatformSAK يعمل بنجاح!');
bot.sendMessage(733071578, '✅ البوت يعمل الآن وجاهز لاستقبال الطلبات!');
