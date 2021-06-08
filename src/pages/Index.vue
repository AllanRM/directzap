<template>
  <q-page class="q-pa-md">
    <q-form @submit="onSubmit">

      <div class="row q-gutter-md q-pr-md">    

        <q-select
          v-model="registros.country"
          input-debounce=""
          label="País"
          :options="options"
          class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12"
        >
          <template v-slot:selected>
              <!--q-avatar color="primary" text-color="white" /-->
              {{ registros.country.label }} <span class="sub-text text-primary">&nbsp; ( +{{ registros.country.value}} )</span>

          </template>

          <template v-slot:option="scope">
            <q-item
              v-bind="scope.itemProps"
              v-on="scope.itemEvents"
            >
              <q-item-section>
                <div class="row justify-between">
                    <q-item-label v-html="scope.opt.label" />
                    <div class="row text-primary">
                      + {{scope.opt.value }}
                    </div>
                </div>
                
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-input 
          v-model="registros.fone"
          type="number" 
          label="DDD + Número"
          class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12"
          :rules="[ val => val && val.length >= 10 || 'Informe o numero de telefone']"
        />

        <q-input 
          v-model="registros.msg"
          filled
          type="textarea" 
          label="Mensagem (Opcional)"
          class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12"
        />

      </div>

      <div class="row justify-center q-py-xl">
        <q-btn color="primary" size="xl" type="submit">
          <img src="zapflat.png">
          <div>&nbsp;Conversar</div>
        </q-btn>

      </div>
    </q-form>


  </q-page>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      registros: {
        country: {},
        fone: '',
        msg: '',
        datahora: '',
      },
      options: stringOptions,
      collection: 'log'
    }
  },
  mounted () {
      this.geLastLog()
  },
  methods: {
    abrirWhats () {
      window.open('https://api.whatsapp.com/send?phone=' + '+' +this.registros.country.value + this.registros.fone + '&text=' + this.registros.msg, '_blank')
    },
    async onSubmit() {
      try {
          this.registros.datahora = new Date()
        await this.$db.collection(this.collection).add(this.registros)
        this.abrirWhats()
        this.$q.notify({
          message: 'Registro salvo no seu histórico',
          color: 'positive'
        })
      } catch (error) {
        console.log(error)
      }
    },    
    async geLastLog() {
        try {
            this.$db.collection(this.collection).orderBy('datahora', 'desc').limit(1).get().then(log => {
                this.registros.country = log[0].country
            })
           
        } catch (error) {
            console.log(error)
            this.registros.country = {"label": "Brasil", "value":"55"}
        }

    },
  },
}

const stringOptions = [
    {
        "label": "Afeganistão",
        "value": "4"
    },
    {
        "label": "África do Sul",
        "value": "710"
    },
    {
        "label": "Albânia",
        "value": "8"
    },
    {
        "label": "Alemanha",
        "value": "276"
    },
    {
        "label": "Andorra",
        "value": "20"
    },
    {
        "label": "Angola",
        "value": "24"
    },
    {
        "label": "Anguilla",
        "value": "660"
    },
    {
        "label": "Antártida",
        "value": "10"
    },
    {
        "label": "Antígua e Barbuda",
        "value": "28"
    },
    {
        "label": "Antilhas Holandesas",
        "value": "530"
    },
    {
        "label": "Arábia Saudita",
        "value": "682"
    },
    {
        "label": "Argélia",
        "value": "12"
    },
    {
        "label": "Argentina",
        "value": "32"
    },
    {
        "label": "Armênia",
        "value": "51"
    },
    {
        "label": "Aruba",
        "value": "533"
    },
    {
        "label": "Austrália",
        "value": "36"
    },
    {
        "label": "Áustria",
        "value": "40"
    },
    {
        "label": "Azerbaijão",
        "value": "31"
    },
    {
        "label": "Bahamas",
        "value": "44"
    },
    {
        "label": "Bahrein",
        "value": "48"
    },
    {
        "label": "Bangladesh",
        "value": "50"
    },
    {
        "label": "Barbados",
        "value": "52"
    },
    {
        "label": "Belarus",
        "value": "112"
    },
    {
        "label": "Bélgica",
        "value": "56"
    },
    {
        "label": "Belize",
        "value": "84"
    },
    {
        "label": "Benin",
        "value": "204"
    },
    {
        "label": "Bermudas",
        "value": "60"
    },
    {
        "label": "Bolívia",
        "value": "68"
    },
    {
        "label": "Bósnia-Herzegóvina",
        "value": "70"
    },
    {
        "label": "Botsuana",
        "value": "72"
    },
    {
        "label": "Brasil",
        "value": "55"
    },
    {
        "ordem": 32,
        "label": "Brunei",
        "sigla2": "BN",
        "sigla3": "BRN",
        "value": "96"
    },
    {
        "ordem": 33,
        "label": "Bulgária",
        "sigla2": "BG",
        "sigla3": "BGR",
        "value": "100"
    },
    {
        "ordem": 34,
        "label": "Burkina Fasso",
        "sigla2": "BF",
        "sigla3": "BFA",
        "value": "854"
    },
    {
        "ordem": 35,
        "label": "Burundi",
        "sigla2": "BI",
        "sigla3": "BDI",
        "value": "108"
    },
    {
        "ordem": 36,
        "label": "Butão",
        "sigla2": "BT",
        "sigla3": "BTN",
        "value": "64"
    },
    {
        "ordem": 37,
        "label": "Cabo Verde",
        "sigla2": "CV",
        "sigla3": "CPV",
        "value": "132"
    },
    {
        "ordem": 38,
        "label": "Camarões",
        "sigla2": "CM",
        "sigla3": "CMR",
        "value": "120"
    },
    {
        "ordem": 39,
        "label": "Camboja",
        "sigla2": "KH",
        "sigla3": "KHM",
        "value": "116"
    },
    {
        "ordem": 40,
        "label": "Canadá",
        "sigla2": "CA",
        "sigla3": "CAN",
        "value": "124"
    },
    {
        "ordem": 41,
        "label": "Cazaquistão",
        "sigla2": "KZ",
        "sigla3": "KAZ",
        "value": "398"
    },
    {
        "ordem": 42,
        "label": "Chade",
        "sigla2": "TD",
        "sigla3": "TCD",
        "value": "148"
    },
    {
        "ordem": 43,
        "label": "Chile",
        "sigla2": "CL",
        "sigla3": "CHL",
        "value": "152"
    },
    {
        "ordem": 44,
        "label": "China",
        "sigla2": "CN",
        "sigla3": "CHN",
        "value": "156"
    },
    {
        "ordem": 45,
        "label": "Chipre",
        "sigla2": "CY",
        "sigla3": "CYP",
        "value": "196"
    },
    {
        "ordem": 46,
        "label": "Cingapura",
        "sigla2": "SG",
        "sigla3": "SGP",
        "value": "702"
    },
    {
        "ordem": 47,
        "label": "Colômbia",
        "sigla2": "CO",
        "sigla3": "COL",
        "value": "170"
    },
    {
        "ordem": 48,
        "label": "Congo",
        "sigla2": "CG",
        "sigla3": "COG",
        "value": "178"
    },
    {
        "ordem": 49,
        "label": "Coréia do Norte",
        "sigla2": "KP",
        "sigla3": "PRK",
        "value": "408"
    },
    {
        "ordem": 50,
        "label": "Coréia do Sul",
        "sigla2": "KR",
        "sigla3": "KOR",
        "value": "410"
    },
    {
        "ordem": 51,
        "label": "Costa do Marfim",
        "sigla2": "CI",
        "sigla3": "CIV",
        "value": "384"
    },
    {
        "ordem": 52,
        "label": "Costa Rica",
        "sigla2": "CR",
        "sigla3": "CRI",
        "value": "188"
    },
    {
        "ordem": 53,
        "label": "Croácia (Hrvatska)",
        "sigla2": "HR",
        "sigla3": "HRV",
        "value": "191"
    },
    {
        "ordem": 54,
        "label": "Cuba",
        "sigla2": "CU",
        "sigla3": "CUB",
        "value": "192"
    },
    {
        "ordem": 55,
        "label": "Dinamarca",
        "sigla2": "DK",
        "sigla3": "DNK",
        "value": "208"
    },
    {
        "ordem": 56,
        "label": "Djibuti",
        "sigla2": "DJ",
        "sigla3": "DJI",
        "value": "262"
    },
    {
        "ordem": 57,
        "label": "Dominica",
        "sigla2": "DM",
        "sigla3": "DMA",
        "value": "212"
    },
    {
        "ordem": 58,
        "label": "Egito",
        "sigla2": "EG",
        "sigla3": "EGY",
        "value": "818"
    },
    {
        "ordem": 59,
        "label": "El Salvador",
        "sigla2": "SV",
        "sigla3": "SLV",
        "value": "222"
    },
    {
        "ordem": 60,
        "label": "Emirados Árabes Unidos",
        "sigla2": "AE",
        "sigla3": "ARE",
        "value": "784"
    },
    {
        "ordem": 61,
        "label": "Equador",
        "sigla2": "EC",
        "sigla3": "ECU",
        "value": "218"
    },
    {
        "ordem": 62,
        "label": "Eritréia",
        "sigla2": "ER",
        "sigla3": "ERI",
        "value": "232"
    },
    {
        "ordem": 63,
        "label": "Eslováquia",
        "sigla2": "SK",
        "sigla3": "SVK",
        "value": "703"
    },
    {
        "ordem": 64,
        "label": "Eslovênia",
        "sigla2": "SI",
        "sigla3": "SVN",
        "value": "705"
    },
    {
        "ordem": 65,
        "label": "Espanha",
        "sigla2": "ES",
        "sigla3": "ESP",
        "value": "724"
    },
    {
        "ordem": 66,
        "label": "Estados Unidos",
        "sigla2": "US",
        "sigla3": "USA",
        "value": "840"
    },
    {
        "ordem": 67,
        "label": "Estônia",
        "sigla2": "EE",
        "sigla3": "EST",
        "value": "233"
    },
    {
        "ordem": 68,
        "label": "Etiópia",
        "sigla2": "ET",
        "sigla3": "ETH",
        "value": "231"
    },
    {
        "ordem": 69,
        "label": "Fiji",
        "sigla2": "FJ",
        "sigla3": "FJI",
        "value": "242"
    },
    {
        "ordem": 70,
        "label": "Filipinas",
        "sigla2": "PH",
        "sigla3": "PHL",
        "value": "608"
    },
    {
        "ordem": 71,
        "label": "Finlândia",
        "sigla2": "FI",
        "sigla3": "FIN",
        "value": "246"
    },
    {
        "ordem": 72,
        "label": "França",
        "sigla2": "FR",
        "sigla3": "FRA",
        "value": "250"
    },
    {
        "ordem": 73,
        "label": "Gabão",
        "sigla2": "GA",
        "sigla3": "GAB",
        "value": "266"
    },
    {
        "ordem": 74,
        "label": "Gâmbia",
        "sigla2": "GM",
        "sigla3": "GMB",
        "value": "270"
    },
    {
        "ordem": 75,
        "label": "Gana",
        "sigla2": "GH",
        "sigla3": "GHA",
        "value": "288"
    },
    {
        "ordem": 76,
        "label": "Geórgia",
        "sigla2": "GE",
        "sigla3": "GEO",
        "value": "268"
    },
    {
        "ordem": 77,
        "label": "Gibraltar",
        "sigla2": "GI",
        "sigla3": "GIB",
        "value": "292"
    },
    {
        "ordem": 78,
        "label": "Grã-Bretanha (Reino Unido, UK)",
        "sigla2": "GB",
        "sigla3": "GBR",
        "value": "826"
    },
    {
        "ordem": 79,
        "label": "Granada",
        "sigla2": "GD",
        "sigla3": "GRD",
        "value": "308"
    },
    {
        "ordem": 80,
        "label": "Grécia",
        "sigla2": "GR",
        "sigla3": "GRC",
        "value": "300"
    },
    {
        "ordem": 81,
        "label": "Groelândia",
        "sigla2": "GL",
        "sigla3": "GRL",
        "value": "304"
    },
    {
        "ordem": 82,
        "label": "Guadalupe",
        "sigla2": "GP",
        "sigla3": "GLP",
        "value": "312"
    },
    {
        "ordem": 83,
        "label": "Guam (Território dos Estados Unidos)",
        "sigla2": "GU",
        "sigla3": "GUM",
        "value": "316"
    },
    {
        "ordem": 84,
        "label": "Guatemala",
        "sigla2": "GT",
        "sigla3": "GTM",
        "value": "320"
    },
    {
        "ordem": 85,
        "label": "Guernsey",
        "sigla2": "G",
        "sigla3": "GGY",
        "value": "832"
    },
    {
        "ordem": 86,
        "label": "Guiana",
        "sigla2": "GY",
        "sigla3": "GUY",
        "value": "328"
    },
    {
        "ordem": 87,
        "label": "Guiana Francesa",
        "sigla2": "GF",
        "sigla3": "GUF",
        "value": "254"
    },
    {
        "ordem": 88,
        "label": "Guiné",
        "sigla2": "GN",
        "sigla3": "GIN",
        "value": "324"
    },
    {
        "ordem": 89,
        "label": "Guiné Equatorial",
        "sigla2": "GQ",
        "sigla3": "GNQ",
        "value": "226"
    },
    {
        "ordem": 90,
        "label": "Guiné-Bissau",
        "sigla2": "GW",
        "sigla3": "GNB",
        "value": "624"
    },
    {
        "ordem": 91,
        "label": "Haiti",
        "sigla2": "HT",
        "sigla3": "HTI",
        "value": "332"
    },
    {
        "ordem": 92,
        "label": "Holanda",
        "sigla2": "NL",
        "sigla3": "NLD",
        "value": "528"
    },
    {
        "ordem": 93,
        "label": "Honduras",
        "sigla2": "HN",
        "sigla3": "HND",
        "value": "340"
    },
    {
        "ordem": 94,
        "label": "Hong Kong",
        "sigla2": "HK",
        "sigla3": "HKG",
        "value": "344"
    },
    {
        "ordem": 95,
        "label": "Hungria",
        "sigla2": "HU",
        "sigla3": "HUN",
        "value": "348"
    },
    {
        "ordem": 96,
        "label": "Iêmen",
        "sigla2": "YE",
        "sigla3": "YEM",
        "value": "887"
    },
    {
        "ordem": 97,
        "label": "Ilha Bouvet (Território da Noruega)",
        "sigla2": "BV",
        "sigla3": "BVT",
        "value": "74"
    },
    {
        "ordem": 98,
        "label": "Ilha do Homem",
        "sigla2": "IM",
        "sigla3": "IMN",
        "value": "833"
    },
    {
        "ordem": 99,
        "label": "Ilha Natal",
        "sigla2": "CX",
        "sigla3": "CXR",
        "value": "162"
    },
    {
        "ordem": 100,
        "label": "Ilha Pitcairn",
        "sigla2": "PN",
        "sigla3": "PCN",
        "value": "612"
    },
    {
        "ordem": 101,
        "label": "Ilha Reunião",
        "sigla2": "RE",
        "sigla3": "REU",
        "value": "638"
    },
    {
        "ordem": 102,
        "label": "Ilhas Aland",
        "sigla2": "AX",
        "sigla3": "ALA",
        "value": "248"
    },
    {
        "ordem": 103,
        "label": "Ilhas Cayman",
        "sigla2": "KY",
        "sigla3": "CYM",
        "value": "136"
    },
    {
        "ordem": 104,
        "label": "Ilhas Cocos",
        "sigla2": "CC",
        "sigla3": "CCK",
        "value": "166"
    },
    {
        "ordem": 105,
        "label": "Ilhas Comores",
        "sigla2": "KM",
        "sigla3": "COM",
        "value": "174"
    },
    {
        "ordem": 106,
        "label": "Ilhas Cook",
        "sigla2": "CK",
        "sigla3": "COK",
        "value": "184"
    },
    {
        "ordem": 107,
        "label": "Ilhas Faroes",
        "sigla2": "FO",
        "sigla3": "FRO",
        "value": "234"
    },
    {
        "ordem": 108,
        "label": "Ilhas Falkland (Malvinas)",
        "sigla2": "FK",
        "sigla3": "FLK",
        "value": "238"
    },
    {
        "ordem": 109,
        "label": "Ilhas Geórgia do Sul e Sandwich do Sul",
        "sigla2": "GS",
        "sigla3": "SGS",
        "value": "239"
    },
    {
        "ordem": 110,
        "label": "Ilhas Heard e McDonald (Território da Austrália)",
        "sigla2": "HM",
        "sigla3": "HMD",
        "value": "334"
    },
    {
        "ordem": 111,
        "label": "Ilhas Marianas do Norte",
        "sigla2": "MP",
        "sigla3": "MNP",
        "value": "580"
    },
    {
        "ordem": 112,
        "label": "Ilhas Marshall",
        "sigla2": "MH",
        "sigla3": "MHL",
        "value": "584"
    },
    {
        "ordem": 113,
        "label": "Ilhas Menores dos Estados Unidos",
        "sigla2": "UM",
        "sigla3": "UMI",
        "value": "581"
    },
    {
        "ordem": 114,
        "label": "Ilhas Norfolk",
        "sigla2": "NF",
        "sigla3": "NFK",
        "value": "574"
    },
    {
        "ordem": 115,
        "label": "Ilhas Seychelles",
        "sigla2": "SC",
        "sigla3": "SYC",
        "value": "690"
    },
    {
        "ordem": 116,
        "label": "Ilhas Solomão",
        "sigla2": "SB",
        "sigla3": "SLB",
        "value": "90"
    },
    {
        "ordem": 117,
        "label": "Ilhas Svalbard e Jan Mayen",
        "sigla2": "SJ",
        "sigla3": "SJM",
        "value": "744"
    },
    {
        "ordem": 118,
        "label": "Ilhas Tokelau",
        "sigla2": "TK",
        "sigla3": "TKL",
        "value": "772"
    },
    {
        "ordem": 119,
        "label": "Ilhas Turks e Caicos",
        "sigla2": "TC",
        "sigla3": "TCA",
        "value": "796"
    },
    {
        "ordem": 120,
        "label": "Ilhas Virgens (Estados Unidos)",
        "sigla2": "VI",
        "sigla3": "VIR",
        "value": "850"
    },
    {
        "ordem": 121,
        "label": "Ilhas Virgens (Inglaterra)",
        "sigla2": "VG",
        "sigla3": "VGB",
        "value": "92"
    },
    {
        "ordem": 122,
        "label": "Ilhas Wallis e Futuna",
        "sigla2": "WF",
        "sigla3": "WLF",
        "value": "876"
    },
    {
        "ordem": 123,
        "label": "índia",
        "sigla2": "IN",
        "sigla3": "IND",
        "value": "356"
    },
    {
        "ordem": 124,
        "label": "Indonésia",
        "sigla2": "ID",
        "sigla3": "IDN",
        "value": "360"
    },
    {
        "ordem": 125,
        "label": "Irã",
        "sigla2": "IR",
        "sigla3": "IRN",
        "value": "364"
    },
    {
        "ordem": 126,
        "label": "Iraque",
        "sigla2": "IQ",
        "sigla3": "IRQ",
        "value": "368"
    },
    {
        "ordem": 127,
        "label": "Irlanda",
        "sigla2": "IE",
        "sigla3": "IRL",
        "value": "372"
    },
    {
        "ordem": 128,
        "label": "Islândia",
        "sigla2": "IS",
        "sigla3": "ISL",
        "value": "352"
    },
    {
        "ordem": 129,
        "label": "Israel",
        "sigla2": "IL",
        "sigla3": "ISR",
        "value": "376"
    },
    {
        "ordem": 130,
        "label": "Itália",
        "sigla2": "IT",
        "sigla3": "ITA",
        "value": "380"
    },
    {
        "ordem": 131,
        "label": "Jamaica",
        "sigla2": "JM",
        "sigla3": "JAM",
        "value": "388"
    },
    {
        "ordem": 132,
        "label": "Japão",
        "sigla2": "JP",
        "sigla3": "JPN",
        "value": "392"
    },
    {
        "ordem": 133,
        "label": "Jersey",
        "sigla2": "JE",
        "sigla3": "JEY",
        "value": "832"
    },
    {
        "ordem": 134,
        "label": "Jordânia",
        "sigla2": "JO",
        "sigla3": "JOR",
        "value": "400"
    },
    {
        "ordem": 135,
        "label": "Kênia",
        "sigla2": "KE",
        "sigla3": "KEN",
        "value": "404"
    },
    {
        "ordem": 136,
        "label": "Kiribati",
        "sigla2": "KI",
        "sigla3": "KIR",
        "value": "296"
    },
    {
        "ordem": 137,
        "label": "Kuait",
        "sigla2": "KW",
        "sigla3": "KWT",
        "value": "414"
    },
    {
        "ordem": 138,
        "label": "Laos",
        "sigla2": "LA",
        "sigla3": "LAO",
        "value": "418"
    },
    {
        "ordem": 139,
        "label": "Látvia",
        "sigla2": "LV",
        "sigla3": "LVA",
        "value": "428"
    },
    {
        "ordem": 140,
        "label": "Lesoto",
        "sigla2": "LS",
        "sigla3": "LSO",
        "value": "426"
    },
    {
        "ordem": 141,
        "label": "Líbano",
        "sigla2": "LB",
        "sigla3": "LBN",
        "value": "422"
    },
    {
        "ordem": 142,
        "label": "Libéria",
        "sigla2": "LR",
        "sigla3": "LBR",
        "value": "430"
    },
    {
        "ordem": 143,
        "label": "Líbia",
        "sigla2": "LY",
        "sigla3": "LBY",
        "value": "434"
    },
    {
        "ordem": 144,
        "label": "Liechtenstein",
        "sigla2": "LI",
        "sigla3": "LIE",
        "value": "438"
    },
    {
        "ordem": 145,
        "label": "Lituânia",
        "sigla2": "LT",
        "sigla3": "LTU",
        "value": "440"
    },
    {
        "ordem": 146,
        "label": "Luxemburgo",
        "sigla2": "LU",
        "sigla3": "LUX",
        "value": "442"
    },
    {
        "ordem": 147,
        "label": "Macau",
        "sigla2": "MO",
        "sigla3": "MAC",
        "value": "446"
    },
    {
        "ordem": 148,
        "label": "Macedônia (República Yugoslava)",
        "sigla2": "MK",
        "sigla3": "MKD",
        "value": "807"
    },
    {
        "ordem": 149,
        "label": "Madagascar",
        "sigla2": "MG",
        "sigla3": "MDG",
        "value": "450"
    },
    {
        "ordem": 150,
        "label": "Malásia",
        "sigla2": "MY",
        "sigla3": "MYS",
        "value": "458"
    },
    {
        "ordem": 151,
        "label": "Malaui",
        "sigla2": "MW",
        "sigla3": "MWI",
        "value": "454"
    },
    {
        "ordem": 152,
        "label": "Maldivas",
        "sigla2": "MV",
        "sigla3": "MDV",
        "value": "462"
    },
    {
        "ordem": 153,
        "label": "Mali",
        "sigla2": "ML",
        "sigla3": "MLI",
        "value": "466"
    },
    {
        "ordem": 154,
        "label": "Malta",
        "sigla2": "MT",
        "sigla3": "MLT",
        "value": "470"
    },
    {
        "ordem": 155,
        "label": "Marrocos",
        "sigla2": "MA",
        "sigla3": "MAR",
        "value": "504"
    },
    {
        "ordem": 156,
        "label": "Martinica",
        "sigla2": "MQ",
        "sigla3": "MTQ",
        "value": "474"
    },
    {
        "ordem": 157,
        "label": "Maurício",
        "sigla2": "MU",
        "sigla3": "MUS",
        "value": "480"
    },
    {
        "ordem": 158,
        "label": "Mauritânia",
        "sigla2": "MR",
        "sigla3": "MRT",
        "value": "478"
    },
    {
        "ordem": 159,
        "label": "Mayotte",
        "sigla2": "YT",
        "sigla3": "MYT",
        "value": "175"
    },
    {
        "ordem": 160,
        "label": "México",
        "sigla2": "MX",
        "sigla3": "MEX",
        "value": "484"
    },
    {
        "ordem": 161,
        "label": "Micronésia",
        "sigla2": "FM",
        "sigla3": "FSM",
        "value": "583"
    },
    {
        "ordem": 162,
        "label": "Moçambique",
        "sigla2": "MZ",
        "sigla3": "MOZ",
        "value": "508"
    },
    {
        "ordem": 163,
        "label": "Moldova",
        "sigla2": "MD",
        "sigla3": "MDA",
        "value": "498"
    },
    {
        "ordem": 164,
        "label": "Mônaco",
        "sigla2": "MC",
        "sigla3": "MCO",
        "value": "492"
    },
    {
        "ordem": 165,
        "label": "Mongólia",
        "sigla2": "MN",
        "sigla3": "MNG",
        "value": "496"
    },
    {
        "ordem": 166,
        "label": "Montenegro",
        "sigla2": "ME",
        "sigla3": "MNE",
        "value": "499"
    },
    {
        "ordem": 167,
        "label": "Montserrat",
        "sigla2": "MS",
        "sigla3": "MSR",
        "value": "500"
    },
    {
        "ordem": 168,
        "label": "Myanma",
        "sigla2": "MM",
        "sigla3": "MMR",
        "value": "104"
    },
    {
        "ordem": 169,
        "label": "Namíbia",
        "sigla2": "NA",
        "sigla3": "NAM",
        "value": "516"
    },
    {
        "ordem": 170,
        "label": "Nauru",
        "sigla2": "NR",
        "sigla3": "NRU",
        "value": "520"
    },
    {
        "ordem": 171,
        "label": "Nepal",
        "sigla2": "NP",
        "sigla3": "NPL",
        "value": "524"
    },
    {
        "ordem": 172,
        "label": "Nicarágua",
        "sigla2": "NI",
        "sigla3": "NIC",
        "value": "558"
    },
    {
        "ordem": 173,
        "label": "Níger",
        "sigla2": "NE",
        "sigla3": "NER",
        "value": "562"
    },
    {
        "ordem": 174,
        "label": "Nigéria",
        "sigla2": "NG",
        "sigla3": "NGA",
        "value": "566"
    },
    {
        "ordem": 175,
        "label": "Niue",
        "sigla2": "NU",
        "sigla3": "NIU",
        "value": "570"
    },
    {
        "ordem": 176,
        "label": "Noruega",
        "sigla2": "NO",
        "sigla3": "NOR",
        "value": "578"
    },
    {
        "ordem": 177,
        "label": "Nova Caledônia",
        "sigla2": "NC",
        "sigla3": "NCL",
        "value": "540"
    },
    {
        "ordem": 178,
        "label": "Nova Zelândia",
        "sigla2": "NZ",
        "sigla3": "NZL",
        "value": "554"
    },
    {
        "ordem": 179,
        "label": "Omã",
        "sigla2": "OM",
        "sigla3": "OMN",
        "value": "512"
    },
    {
        "ordem": 180,
        "label": "Palau",
        "sigla2": "PW",
        "sigla3": "PLW",
        "value": "585"
    },
    {
        "ordem": 181,
        "label": "Panamá",
        "sigla2": "PA",
        "sigla3": "PAN",
        "value": "591"
    },
    {
        "ordem": 182,
        "label": "Papua-Nova Guiné",
        "sigla2": "PG",
        "sigla3": "PNG",
        "value": "598"
    },
    {
        "ordem": 183,
        "label": "Paquistão",
        "sigla2": "PK",
        "sigla3": "PAK",
        "value": "586"
    },
    {
        "ordem": 184,
        "label": "Paraguai",
        "sigla2": "PY",
        "sigla3": "PRY",
        "value": "600"
    },
    {
        "ordem": 185,
        "label": "Peru",
        "sigla2": "PE",
        "sigla3": "PER",
        "value": "604"
    },
    {
        "ordem": 186,
        "label": "Polinésia Francesa",
        "sigla2": "PF",
        "sigla3": "PYF",
        "value": "258"
    },
    {
        "ordem": 187,
        "label": "Polônia",
        "sigla2": "PL",
        "sigla3": "POL",
        "value": "616"
    },
    {
        "ordem": 188,
        "label": "Porto Rico",
        "sigla2": "PR",
        "sigla3": "PRI",
        "value": "630"
    },
    {
        "ordem": 189,
        "label": "Portugal",
        "sigla2": "PT",
        "sigla3": "PRT",
        "value": "620"
    },
    {
        "ordem": 190,
        "label": "Qatar",
        "sigla2": "QA",
        "sigla3": "QAT",
        "value": "634"
    },
    {
        "ordem": 191,
        "label": "Quirguistão",
        "sigla2": "KG",
        "sigla3": "KGZ",
        "value": "417"
    },
    {
        "ordem": 192,
        "label": "República Centro-Africana",
        "sigla2": "CF",
        "sigla3": "CAF",
        "value": "140"
    },
    {
        "ordem": 193,
        "label": "República Democrática do Congo",
        "sigla2": "CD",
        "sigla3": "COD",
        "value": "180"
    },
    {
        "ordem": 194,
        "label": "República Dominicana",
        "sigla2": "DO",
        "sigla3": "DOM",
        "value": "214"
    },
    {
        "ordem": 195,
        "label": "República Tcheca",
        "sigla2": "CZ",
        "sigla3": "CZE",
        "value": "203"
    },
    {
        "ordem": 196,
        "label": "Romênia",
        "sigla2": "RO",
        "sigla3": "ROM",
        "value": "642"
    },
    {
        "ordem": 197,
        "label": "Ruanda",
        "sigla2": "RW",
        "sigla3": "RWA",
        "value": "646"
    },
    {
        "ordem": 198,
        "label": "Rússia (antiga URSS) - Federação Russa",
        "sigla2": "RU",
        "sigla3": "RUS",
        "value": "643"
    },
    {
        "ordem": 199,
        "label": "Saara Ocidental",
        "sigla2": "EH",
        "sigla3": "ESH",
        "value": "732"
    },
    {
        "ordem": 200,
        "label": "Saint Vincente e Granadinas",
        "sigla2": "VC",
        "sigla3": "VCT",
        "value": "670"
    },
    {
        "ordem": 201,
        "label": "Samoa Americana",
        "sigla2": "AS",
        "sigla3": "ASM",
        "value": "16"
    },
    {
        "ordem": 202,
        "label": "Samoa Ocidental",
        "sigla2": "WS",
        "sigla3": "WSM",
        "value": "882"
    },
    {
        "ordem": 203,
        "label": "San Marino",
        "sigla2": "SM",
        "sigla3": "SMR",
        "value": "674"
    },
    {
        "ordem": 204,
        "label": "Santa Helena",
        "sigla2": "SH",
        "sigla3": "SHN",
        "value": "654"
    },
    {
        "ordem": 205,
        "label": "Santa Lúcia",
        "sigla2": "LC",
        "sigla3": "LCA",
        "value": "662"
    },
    {
        "ordem": 206,
        "label": "São Bartolomeu",
        "sigla2": "BL",
        "sigla3": "BLM",
        "value": "652"
    },
    {
        "ordem": 207,
        "label": "São Cristóvão e Névis",
        "sigla2": "KN",
        "sigla3": "KNA",
        "value": "659"
    },
    {
        "ordem": 208,
        "label": "São Martim",
        "sigla2": "MF",
        "sigla3": "MAF",
        "value": "663"
    },
    {
        "ordem": 209,
        "label": "São Tomé e Príncipe",
        "sigla2": "ST",
        "sigla3": "STP",
        "value": "678"
    },
    {
        "ordem": 210,
        "label": "Senegal",
        "sigla2": "SN",
        "sigla3": "SEN",
        "value": "686"
    },
    {
        "ordem": 211,
        "label": "Serra Leoa",
        "sigla2": "SL",
        "sigla3": "SLE",
        "value": "694"
    },
    {
        "ordem": 212,
        "label": "Sérvia",
        "sigla2": "RS",
        "sigla3": "SRB",
        "value": "688"
    },
    {
        "ordem": 213,
        "label": "Síria",
        "sigla2": "SY",
        "sigla3": "SYR",
        "value": "760"
    },
    {
        "ordem": 214,
        "label": "Somália",
        "sigla2": "SO",
        "sigla3": "SOM",
        "value": "706"
    },
    {
        "ordem": 215,
        "label": "Sri Lanka",
        "sigla2": "LK",
        "sigla3": "LKA",
        "value": "144"
    },
    {
        "ordem": 216,
        "label": "St. Pierre and Miquelon",
        "sigla2": "PM",
        "sigla3": "SPM",
        "value": "666"
    },
    {
        "ordem": 217,
        "label": "Suazilândia",
        "sigla2": "SZ",
        "sigla3": "SWZ",
        "value": "748"
    },
    {
        "ordem": 218,
        "label": "Sudão",
        "sigla2": "SD",
        "sigla3": "SDN",
        "value": "736"
    },
    {
        "ordem": 219,
        "label": "Suécia",
        "sigla2": "SE",
        "sigla3": "SWE",
        "value": "752"
    },
    {
        "ordem": 220,
        "label": "Suíça",
        "sigla2": "CH",
        "sigla3": "CHE",
        "value": "756"
    },
    {
        "ordem": 221,
        "label": "Suriname",
        "sigla2": "SR",
        "sigla3": "SUR",
        "value": "740"
    },
    {
        "ordem": 222,
        "label": "Tadjiquistão",
        "sigla2": "TJ",
        "sigla3": "TJK",
        "value": "762"
    },
    {
        "ordem": 223,
        "label": "Tailândia",
        "sigla2": "TH",
        "sigla3": "THA",
        "value": "764"
    },
    {
        "ordem": 224,
        "label": "Taiwan",
        "sigla2": "TW",
        "sigla3": "TWN",
        "value": "158"
    },
    {
        "ordem": 225,
        "label": "Tanzânia",
        "sigla2": "TZ",
        "sigla3": "TZA",
        "value": "834"
    },
    {
        "ordem": 226,
        "label": "Território Britânico do Oceano índico",
        "sigla2": "IO",
        "sigla3": "IOT",
        "value": "86"
    },
    {
        "ordem": 227,
        "label": "Territórios do Sul da França",
        "sigla2": "TF",
        "sigla3": "ATF",
        "value": "260"
    },
    {
        "ordem": 228,
        "label": "Territórios Palestinos Ocupados",
        "sigla2": "PS",
        "sigla3": "PSE",
        "value": "275"
    },
    {
        "ordem": 229,
        "label": "Timor Leste",
        "sigla2": "TP",
        "sigla3": "TMP",
        "value": "626"
    },
    {
        "ordem": 230,
        "label": "Togo",
        "sigla2": "TG",
        "sigla3": "TGO",
        "value": "768"
    },
    {
        "ordem": 231,
        "label": "Tonga",
        "sigla2": "TO",
        "sigla3": "TON",
        "value": "776"
    },
    {
        "ordem": 232,
        "label": "Trinidad and Tobago",
        "sigla2": "TT",
        "sigla3": "TTO",
        "value": "780"
    },
    {
        "ordem": 233,
        "label": "Tunísia",
        "sigla2": "TN",
        "sigla3": "TUN",
        "value": "788"
    },
    {
        "ordem": 234,
        "label": "Turcomenistão",
        "sigla2": "TM",
        "sigla3": "TKM",
        "value": "795"
    },
    {
        "ordem": 235,
        "label": "Turquia",
        "sigla2": "TR",
        "sigla3": "TUR",
        "value": "792"
    },
    {
        "ordem": 236,
        "label": "Tuvalu",
        "sigla2": "TV",
        "sigla3": "TUV",
        "value": "798"
    },
    {
        "ordem": 237,
        "label": "Ucrânia",
        "sigla2": "UA",
        "sigla3": "UKR",
        "value": "804"
    },
    {
        "ordem": 238,
        "label": "Uganda",
        "sigla2": "UG",
        "sigla3": "UGA",
        "value": "800"
    },
    {
        "ordem": 239,
        "label": "Uruguai",
        "sigla2": "UY",
        "sigla3": "URY",
        "value": "858"
    },
    {
        "ordem": 240,
        "label": "Uzbequistão",
        "sigla2": "UZ",
        "sigla3": "UZB",
        "value": "860"
    },
    {
        "ordem": 241,
        "label": "Vanuatu",
        "sigla2": "VU",
        "sigla3": "VUT",
        "value": "548"
    },
    {
        "ordem": 242,
        "label": "Vaticano",
        "sigla2": "VA",
        "sigla3": "VAT",
        "value": "336"
    },
    {
        "ordem": 243,
        "label": "Venezuela",
        "sigla2": "VE",
        "sigla3": "VEN",
        "value": "862"
    },
    {
        "ordem": 244,
        "label": "Vietnã",
        "sigla2": "VN",
        "sigla3": "VNM",
        "value": "704"
    },
    {
        "ordem": 245,
        "label": "Zâmbia",
        "sigla2": "ZM",
        "sigla3": "ZMB",
        "value": "894"
    },
    {
        "ordem": 246,
        "label": "Zimbábue",
        "sigla2": "ZW",
        "sigla3": "ZWE",
        "value": "716"
    }
]

</script>
