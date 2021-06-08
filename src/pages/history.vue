<template>
  <q-page class="q-pa-md">

    <q-table
      title=""
      :data="registros"
      :columns="columns"
      row-key="key"
      :pagination="pagination"
      flat
      separator="none"
      hide-header
      hide-bottom
    >
        <template v-slot:body-cell-fone="props">
            <div class="q-mt-xs items-center">
                <a class="text-primary text-bold q-pl-sm" >{{ props.row.fone }} </a>    <br/>             
                <a class="text-grey-6 q-pl-md"> {{ props.row.datahora | formatar }}</a>
            </div>
        </template>

        <template v-slot:body-cell-actions="props">

            <q-td :props="props">
                <q-btn 
                    icon=""
                    color="teal"
                    flat
                    @click="abrirWhats(props.row.fone)"
                >
                    <img src="zapico.png">
                </q-btn>
 

                <q-btn 
                    icon="content_copy"
                    color="primary"
                    flat
                    @click="copiarTexto(props.row.fone)"
                />

                <q-btn 
                    icon="delete"
                    color="red"
                    flat
                    @click="deleteLog(props.row.key)"
                />


            </q-td>
        </template>
    </q-table>

  </q-page>
</template>

<script>
import moment from 'moment'
import { copyToClipboard } from 'quasar'
export default {
  name: 'history',
  data () {
    return {
      collection: 'log',
      pagination: {
        rowsPerPage: 1000
      },
      columns: [
        {
          name: 'fone',
          field: 'fone',
          label: '',
          align: 'left',
        },
        {
          name: 'actions',
          field: 'actions',
          align: 'right',
        },

      ],
      registros: [          
        ]
    }
  },
  methods: {
    copiarTexto (props) {
      copyToClipboard(props).then(() => {
        this.$q.notify({
          message: 'Número copiado com sucesso',
          color: 'positive',
          icon: 'info',
        })
      })
    },
    async getLog() {
        try {
            const logs = await this.$db.collection(this.collection).orderBy('datahora', 'desc').get( {keys: true})
            this.registros = logs.map((log) => {
                return {
                    datahora: log.data.datahora,
                    fone: '+' + log.data.country.value + log.data.fone,
                    key: log.key
                }
            })

        } catch (error) {
            console.log(error)
        }

    },

    async deleteLog(keyRegistro) {
        try {
            await this.$db.collection(this.collection).doc(keyRegistro).delete()
            this.$q.notify({
            message: 'Registro eliminado com sucesso do seu histórico',
            color: 'negative',
            icon:"delete"
            })
            this.getLog()
        } catch (error) {
            console.log(error)
        }
    },
    abrirWhats (fone) {
      window.open('https://api.whatsapp.com/send?phone=' + fone, '_blank')
    },


  },

  mounted () {
      this.getLog()
  },
  filters: {
    formatar(value) {
        if (value) {
            return moment(String(value)).format('DD/MM/YYYY hh:mm')
        }
    }

  }
}


</script>
