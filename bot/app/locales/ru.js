{
	"menu": {
		"main": "<a href='https://t.me/TonMoonRU'>Мониторинг стоимости Toncoin на разных площадках</a>.\nСледите за изменением курса Toncoin.\nПокупайте удобно и дешево.",
		"buttons": {
			"monitoring": "🌙 Мониторинг",
			"rate": "💎 Курс",
			"account": "👤 Мой аккаунт",
			"settings": "⚙️ Настройки",
			"help": "💬 Помощь"
		}
	},
	"rate": {
		"main": "<b>Стоимость <a href='https://www.coingecko.com/en/coins/the-open-network'>Toncoin</a>: {{rateLocale}} {{rate}}</b>",
		"buttons": {
			"addNotify": "🎾 Создать уведомление",
			"notifies": "🌙 Список уведомлений",
			"onPhone": "🌙 Уведомление по номеру",
			"offPhone": "❌ Уведомление по номеру"
		}
	},
	"account": {
		"main": "👤 <b>Мой аккаунт</b>\n\n👋🏻 Ник: {{username}}\n🤴 Премиум: {{premium}} дней\n🐈‍⬛ NFT: {{nft}}",
		"buttons": {
			"buy": "🤴 Купить премиум",
			"wallets": "👛 Мой кошелек"
		},
		"premium": {
			"main": "👉 Выберите премиум период",
			"description": "Подписка в @tonmoonbot: {{month}} месяц(а)",
			"buttons": {
				"month": "Купить на {{month}} месяц - {{price}} TONCOIN"
			},
			"buy": {
				"main": "👉 Выберите способ оплаты",
				"buttons": {
					"method": "Купить через {{source}}"
				}
			}
		},
		"wallets": {
			"main": "👛 <b>Мой кошелек</b>\n\n<b>Посмотреть в <a href='{{link}}'>TonMoon Explorer</a></b>\n<b>Общий баланс:</b> {{totalBalance}}\n\nНажмите на адрес, чтобы настроить его",
			"selectAddress": {
				"buttons": {
					"name": "✍️ Изменить название адреса",
					"show": "🌕 Показывать в обозревателе",
					"hide": "❌ Скрывать в обозревателе"
				},
				"main": "👛 <b>Адрес </b>{{name}}\n<code>{{address}}</code>\n<b>Посмотреть в <a href='{{link}}'>TonMoon Explorer</a></b>\n\n<b>Баланс: </b>{{balance}}\n<b>Последняя активность: </b>{{status}}\n<b>Версия: </b>{{version}}"
			}
		}
	},
	"settings": {
		"main": "⚙️ <b>Настройки</b>\n\nВаш язык: {{language}}\nВаша валюта: {{currency}}",
		"buttons": {
			"editCurrency": "Изменить валюту",
			"editLanguage": "Изменить язык",
			"addPhone": "Добавить номер телефона",
			"addAddress": "🎾 Добавить кошелек TON"
		},
		"addAddress": "🌕 Верификация кошелька\n\nПосле подтверждения принадлежности кошелька, адрес будет связан с Вашим телеграм аккаунтом в экосистеме TonMoon\nПосле приобретения NFT с любого из указанных Вами адресов, сертификаты будут синхронизирован с этим ботом.\n\n⚠️ Пожалуйста, делайте перевод только со СВОЕГО кошелька, от которого Вы знаете СЕКРЕТНЫЙ КЛЮЧ. Верификация адрессов бирж (CEX,DEX), p2p запрещена, в том числе и кошельки ботов\n\nДля верификации сделайте перевод <code>0.1</code> TON по адресу:\n<code>EQDJng5KbAKunqHoWMEvc6MZsaRa9UWb060RmGtPTvl0R60m</code>\nПримечание:\n<code>{{id}}</code>\n\n💫 Нажмите на адрес или примечание, чтобы скопировать его\n💫 Привязывать можно неограниченное количество кошельков\n💫 Верифицированный адрес появится в разделе <b>Мой аккаунт</b>",
		"addedAddress": "🌙 Адрес {{wallet}} был успешно верифицирован",
		"addedPhone": "🌙 Номер телефона добавлен"
	},
	"selectCurrency": "👉 Выберите локальную валюту",
	"selectLanguage": "👉 Выберите язык бота",
	"back": "‹ Назад",
	"monitoring": {
		"main": {
			"buy": "📈 Стоимость покупки Toncoin на выбранных площадках",
			"sell": "📉 Стоимость продажи Toncoin на выбранных площадках",
			"empty": "⚠️ Для начала нужно добавить площадку для отслеживания"
		},
		"buttons": {
			"add": "🎾 Добавить отслеживание",
			"edit": "✏️ Изменить отслеживания",
			"targetBuy": "📈 Купить",
			"targetSell": "📉 Продать"
		},
		"edit": {
			"main": {
				"buy": "👉 Выберите площадки для отслеживания стоимости покупки Toncoin",
				"sell": "👉 Выберите площадки для отслеживания стоимости продажи Toncoin"
			}
		}
	},
	"market": {
		"main": {
			"buy": "💠 Вы покупаете Toncoin",
			"sell": "💠 Вы продаете Toncoin",
			"pair": "В {{source}} ({{type}}) · {{direction}}"
		}
	},
	"notifications": {
		"marketAdd": "Площадка успешно добавлена",
		"marketRemove": "Площадка успешно удалена",
		"premiumNeeded": "Это функция доступна премиум аккаунту",
		"notifyRemove": "Уведомление успешно удалено",
		"notifyNotFound": "Уведомление не найдено",
		"phoneNeeded": "Укажите номер телефона в настройках",
		"editStatus": "Статус изменен"
	},
	"errors": {
		"request": "Неполучилось обработать запрос. Попробуйте еще раз",
		"marketAdded": "Маркет уже добавлен",
		"marketNotFound": "Маркет не найден",
		"fixLimit": "⚠️ Фиксированная стоимость должна быть в диапазоне от {{min}} до {{max}}.",
		"percentLimit": "⚠️ Процент от стоимости должен быть в пределах от {{min}} до {{max}}.",
		"onlyNumber": "⚠️ Укажите только число, без лишних символов",
		"AddressNotFound": "Адрес не найден",
		"lengthString": "⚠️ Длина названия больше 20 символов"
	},
	"notify": {
		"add": {
			"main": "⚠️ Для добавления уведомления о изменении курса, выберите единицу измерения и отправьте ТОЛЬКО число.\n\nДля процентов допускается отрицательное значение"
		},
		"alert": {
			"b": "<b>🌕 Уведомление</b>\n\n📈 Цена Toncoin повысилась до {{rate}}\n\n<b>Стоимость Toncoin: {{currentRate}}</b>",
			"m": "<b>🌕 Уведомление</b>\n\n📉 Цена Toncoin снизилась до {{rate}}\n\n<b>Стоимость Toncoin: {{currentRate}}</b>"
		},
		"notifyAdded": {
			"b": "<b>🌙 Уведомление создано</b>\nМы уведомим Вас когда стоимость Toncoin повысится до {{dot}}",
			"m": "<b>🌙 Уведомление создано</b>\nМы уведомим Вас когда стоимость Toncoin снизится до {{dot}}"
		},
		"main": {
			"empty": "⚠️ У Вас еще нет уведомлений о измениии стоимости Toncoin.",
			"list": "<b>💠 Список активных уведомлений.</b>\nНажмите на уведомление, чтобы удалить его."
		},
		"setAddressNameDone": "🌙 Название для адреса изменено",
		"setAddressName": "<b>✍️ Введите новое название для указаного адреса</b>"
	}
}