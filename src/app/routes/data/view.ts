import activeData from '../../data/activeData'
import activeDataSchema from '../../data/activeDataSchema'
import staticData from '../../data/staticData'
import { ActiveDataScheme } from 'ccs-prototype-kit-model-interface'
import { getActiveTable } from 'ccs-prototype-kit-model-interface/dist/data/activeDataInterface'
import { getStaticTable } from 'ccs-prototype-kit-model-interface/dist/data/staticDataInterface'
import { Request, Response, Router } from 'express'
import { TableRow } from 'ccs-prototype-kit-model-interface/dist/types/data/tables'


const router = Router()

router.get('/view', (_: Request, res: Response) => {
  const activeTables = Object.keys(activeData).map(tableName => {return {value: `${tableName}-active`, text: tableName}})
  const staticTables = Object.keys(staticData).map(tableName => {return {value: `${tableName}-static`, text: tableName}})

  const tables: Array<{value: string, text: string}> = activeTables.concat(staticTables).sort((a, b) => a.text.localeCompare(b.text))

  res.render(
    'data/index.html',
    {
      tables: tables
    }
  )
})

router.post('/view', (req: Request, res: Response) => {
  const data = req.body['table'].split('-')

  res.redirect(`/data/view/${data[1]}/${data[0]}`)
})

router.get('/view/:dataType/:tableName', (req: Request, res: Response) => {
  const tableName: string = req.params['tableName']
  let table: TableRow[]
  let headers: Array<string>

  if (req.params['dataType'] === 'static') {
    table = getStaticTable(tableName)
    headers = Object.keys(table[0])
  } else {
    table = getActiveTable(req, tableName)
    const schema: ActiveDataScheme = activeDataSchema[tableName]
    headers = Object.keys(schema)
  }

  const head: Array<{text: string}> = headers.map(header => {return {text: header}})
  const rows: Array<Array<{text: string}>> = table.map(row => head.map(heading => {return {text: row[heading.text]}}))

  res.render(
    'data/show.html',
    {
      tableName: tableName,
      head: head,
      rows: rows
    }
  )
})

export default router