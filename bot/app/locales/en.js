{
	"menu": {
		"main": "<a href='https://t.me/TonMoonRU'>Monitoring the cost of Toncoin on different exchanges</a>.\nBuy conveniently and cheaply.",
		"buttons": {
			"monitoring": "🌙 Monitoring",
			"rate": "💎 Rate",
			"account": "👤 My account",
			"settings": "⚙️ Settings",
			"help": "💬 Help"
		}
	},
	"rate": {
		"main": "<b>💎 Rate</b>\n\n<b>Toncoin cost: {{rateLocale}} {{rate}}</b>",
		"buttons": {
			"addNotify": "🎾 Create notification",
			"notifies": "🌙 List of notifications",
			"onPhone": "🌙 Notification by phone number",
			"offPhone": "❌ Notification by phone number"
		}
	},
	"account": {
		"main": "👤 <b>My account</b>\n\n👋🏻 Username: {{username}}\n🤴 Premium: {{premium}} days\n🐈‍⬛ NFT: {{nft}}",
		"buttons": {
			"buy": "🤴 Buy premium",
			"wallets": "👛 My wallet"
		},
		"premium": {
			"main": "👉 Choose a premium period",
			"description": "Subscription to @tonmoonbot : {{month}} month(s)",
			"buttons": {
				"month": "Buy for {{month}} month - {{price}} TONCOIN"
			},
			"buy": {
				"main": "👉 Select a payment method",
				"buttons": {
					"method": "Buy via {{source}}"
				}
			}
		},
		"wallets": {
			"main": "👛 <b>My wallet</b>\n\n<b>View in <a href='{{link}}'>TonMoon Explorer</a></b>\n<b>Total balance:</b> {{totalBalance}}\n\nClick on an address to set it up",
			"selectAddress": {
				"buttons": {
					"name": "✍️ Edit name address",
					"show": "🌕 Show in explorer",
					"hide": "❌ Hide in explorer"
				},
				"main": "👛 <b>Address </b>{{name}}\n<code>{{address}}</code>\n<b>View in <a href='{{link}}'>TonMoon Explorer</a></b>\n\n<b>Balance: </b>{{balance}}\n<b>Last activity: </b>{{status}}\n<b>Wallet Type: </b>{{version}}"
			
			}
		}
	},

	"settings": {
		"main": "⚙️ <b>Settings</b>\n\nYour language: {{language}}\nYour currency: {{currency}}",
		"buttons": {
			"editCurrency": "Edit currency",
			"editLanguage": "Edit language",
			"addPhone": "👉 Add phone number",
			"addAddress": "🎾 Add TON wallet"
		},
		"addAddress": "🌕 Wallet verification\n\nAfter confirming the ownership of the wallet, the address will be associated with your telegram account in the TonMoon ecosystem\nAfter buying NFT from any of the addresses you specified, the certificates will be synchronized with this bot.\n\n⚠️ Please only transfer from YOUR wallet for which you know the SECRET KEY. Verification of addresses of exchanges (CEX, DEX), p2p is prohibited, including bot wallets\n\nMake a transfer for verification <code>0.1</code> TON by address:\n<code>EQDJng5KbAKunqHoWMEvc6MZsaRa9UWb060RmGtPTvl0R60m</code>\nNote:\n<code>{{id}}</code>\n\n💫 Click on an address or note to copy it\n💫 You can link an unlimited number of wallets\n💫 The verified address will appear in the section <b>My account</b>",
		"addedAddress": "🌙 The address {{wallet}} has been successfully verified",
		"addedPhone": "🌙 Phone number added"
	},
	"selectCurrency": "👉 Select your local currency",
	"selectLanguage": "👉 Select the bot language",
	"back": "‹ Back",
	"monitoring": {
		"main": {
			"buy": "📈 Cost of buying Toncoin on selected markets",
			"sell": "📉 Selling price of Toncoin on selected markets",
			"empty": "⚠️ First you need to add a tracking market"
		},
		"buttons": {
			"add": "🎾 Add tracking",
			"edit": "✏️ Edit tracking",
			"targetBuy": "📈 Buy",
			"targetSell": "📉 Sell"
		},
		"edit": {
			"main": {
				"buy": "👉 Select markets to track the cost of buying Toncoin",
				"sell": "👉 Select markets to track the Toncoin selling price"
			}
		}
	},
	"market": {
		"main": {
			"buy": "💠 You buy Toncoin",
			"sell": "💠 You sell Toncoin",
			"pair": "In {{source}} ({{type}}) · {{direction}}"
		}
	},
	"notifications": {
		"marketAdd": "Market added successfully",
		"marketRemove": "Market successfully deleted",
		"premiumNeeded": "This market is available for premium account",
		"notifyRemove": "Notification successfully deleted",
		"notifyNotFound": "Notification not found",
		"phoneNeeded": "Enter your phone number in the settings",
		"editStatus": "Status edited"
	},
	"errors": {
		"request": "Failed to process the request. Try again",
		"marketAdded": "Market already added",
		"marketNotFound": "Market not found",
		"fixLimit": "⚠️ The fixed cost must be in the range of {{min}} до {{max}}.",
		"percentLimit": "⚠️ The percentage of the cost must be in the range of {{min}} до {{max}}.",
		"onlyNumber": "⚠️ Specify only a number, no extra characters",
		"AddressNotFound": "Address not found",
		"lengthString": "⚠️ Name length over 20 characters"
	},
	"notify": {
		"add": {
			"main": "⚠️ To add a rate change notification, select a unit of measure and send ONLY a number.\n\nNegative value is allowed for percent"
		},
		"alert": {
			"b": "<b>🌕 Notification</b>\n\n📈 Toncoin price went up to {{rate}}\n\n<b>Toncoin cost: {{currentRate}}</b>",
			"m": "<b>🌕 Notification</b>\n\n📉 Toncoin price went down to {{rate}}\n\n<b>Toncoin cost: {{currentRate}}</b>"
		},
		"notifyAdded": {
			"b": "<b>🌙 Notification created</b>\nWe will notify you when the Toncoin price rises to {{dot}}",
			"m": "<b>🌙 Notification created</b>\nWe will notify you when the Toncoin price drops to {{dot}}"
		},
		"main": {
			"empty": "⚠️ Your notification list is empty.",
			"list": "<b>💠 List of active notifications.</b>\nClick on a notification to delete it."
		},
		"setAddressNameDone": "🌙 Name for address edited",
		"setAddressName": "<b>✍️ Enter new name for current address</b>"
	}
}