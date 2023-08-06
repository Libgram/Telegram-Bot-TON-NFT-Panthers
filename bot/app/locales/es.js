{
	"menu": {
		"main": "<a href='https://t.me/TonMoonRU'>Monitoreo del costo de Toncoin en diferentes sitios</a>.\nEsté atento a los cambios de curso Toncoin.\nCompra de forma cómoda y económica.",
		"buttons": {
			"monitoring": "🌙 Supervisión",
			"rate": "💎 Tasa de costo",
			"account": "👤 Mi oficina",
			"settings": "⚙️ Ajustes",
			"help": "💬 Ayudar"
					}
	},
	"rate": {
		"main": "<b>Precio <a href='https://www.coingecko.com/en/coins/the-open-network'>Toncoin</a>: {{rateLocale}} {{rate}}</b>",
		"buttons": {
			"addNotify": "🎾 Crear notificación",
			"notifies": "🌙 Lista de notificaciones",
			"onPhone": "🌙 Notificación por número",
			"offPhone": "❌ Notificación por número"
		}
	},
	"account": {
		"main": "👤 <b>Mi oficina</b>\n\n👋🏻 Mella: {{username}}\n🤴 Cuenta privilegiada: {{premium}} días\n🐈‍⬛ NFT: {{nft}}",
		"buttons": {
			"buy": "🤴 Comprar Premium"
		},
		"premium": {
			"main": "👉 Elija un período premium",
			"description": "Suscribirse a @tonmoonbot: {{month}} meses",
			"buttons": {
				"month": "Comprar en {{month}} mes - {{price}} TONCOIN"
			},
			"buy": {
				"main": "👉 Seleccione un método de pago",
				"buttons": {
					"method": "Comprar a través de {{source}}"
				}
			}
		}
	},
		"settings": {
		"main": "⚙️ <b>Ajustes</b>\n\nTu lenguaje: {{language}}\n Tu moneda: {{currency}}",
		"buttons": {
			"editCurrency": "Cambiar moneda de pago",
			"editLanguage": "Cambia el idioma",
			"addPhone": "Agregar el número de teléfono",
			"addAddress": "Agregar billetera TON"
		},
		"addAddress": "🌕 Verificación de billetera\n\nDespués de confirmar la propiedad de la billetera, la dirección se asociará con su cuenta de Telegram en el ecosistema TonMoon\nDespués de comprar NFT desde cualquiera de las direcciones que especificó, los certificados se sincronizarán con este bot.\n\n⚠️ Solo transfiera desde SU billetera para la cual conoce la CLAVE SECRETA. Se prohíbe la verificación de direcciones de intercambios (CEX, DEX), p2p, incluidas las billeteras bot\n\nHacer una transferencia para verificación <code>0.1</code> TON por la dirección:\n<code>EQDJng5KbAKunqHoWMEvc6MZsaRa9UWb060RmGtPTvl0R60m</code>\nNota:\n<code>{{id}}</code>\n\n💫 Haga clic en una dirección o nota para copiarla\n💫 Puede vincular un número ilimitado de carteras\n💫 La dirección verificada aparecerá en la sección <b>Mi oficina</b>",
		"addedAddress": "🌙 dirección de la billetera{{wallet}} ha sido verificado con éxito",
		"addedPhone": "🌙 Número de teléfono agregado"
	},
	"selectCurrency": "👉 Elige la moneda local",
	"selectLanguage": "👉 Seleccione el idioma del bot",
	"back": "‹ Аtrás",
	"monitoring": {
		"main": {
			"buy": "📈 El costo de comprar Toncoin en sitios seleccionados",
			"sell": "📉 El costo de vender Toncoin en sitios seleccionados",
			"empty": "⚠️ Primero necesitas agregar una plataforma para poder seguirla"
		},
				"buttons": {
			"add": "🎾 Añadir seguimiento",
			"edit": "✏️ Editar seguimiento",
			"targetBuy": "📈 Comprar",
			"targetSell": "📉 Vender"
		},
		"edit": {
			"main": {
				"buy": "👉 Elija plataformas para rastrear el costo de su compra Toncoin",
				"sell": "👉 Elija plataformas para rastrear el costo de la venta Toncoin"
			}
		}
	},
	"market": {
		"main": {
			"buy": "💠 Estas comprando Toncoin",
			"sell": "💠 Venden Toncoin",
			"pair": "В {{source}} ({{type}}) · {{direction}}"
		}
	},
	"notifications": {
		"marketAdd": "Lugar añadido con éxito",
		"marketRemove": "El lugar se ha eliminado con éxito",
		"premiumNeeded": "Esta característica está disponible para la cuenta premium",
		"notifyRemove": "Notificación eliminada con éxito",
		"notifyNotFound": "Notificación no encontrada",
		"phoneNeeded": "Ingrese su número de teléfono en la configuración"
	},
	"errors": {
		"request": "No se pudo procesar la solicitud. Intentar otra vez",
		"marketAdded": "Mercado ya agregado",
		"marketNotFound": "Mercado no encontrado",
		"fixLimit": "⚠️ El costo fijo debe estar entre {{min}} antes de {{max}}.",
		"percentLimit": "⚠️ El porcentaje del costo debe estar entre {{min}} antes de {{max}}.",
		"onlyNumber": "⚠️ Ingrese solo un número, sin caracteres adicionales"
	},
	"notify": {
		"add": {
			"main": "⚠️ Para agregar una notificación de cambio de tarifa, seleccione la unidad de medida y envíe un número SOLAMENTE.\n\nLos porcentajes pueden ser negativos."
		},
		"alert": {
			"b": "<b>🌕 Notificación</b>\n\n📈 El precio ha subido a {{rate}}\n\n<b>Precio de la moneda: {{currentRate}}</b>",
			"m": "<b>🌕 Notificación</b>\n\n📉 El precio de Toncoin cayó a {{rate}}\n\n<b>Precio de la moneda: {{currentRate}}</b>"
		},
		"notifyAdded": {
			"b": "<b>🌙 Notificación creada</b>\nTe avisaremos cuando el valor de Toncoin suba a {{dot}}",
			"m": "<b>🌙 Notificación creada</b>\nLe notificaremos cuando el valor de Toncoin baje a {{dot}}"
		},
		"main": {
			"empty": "⚠️ Aún no tienes notificaciones de cambio de precio de Toncoin.",
			"list": "<b>💠 Lista de notificaciones activas.</b>\nHaga clic en una notificación para eliminarla."
		}
	}
}