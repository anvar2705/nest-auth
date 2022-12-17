import { DataSource } from 'typeorm'
import dbConfiguration from './data-source.config'
import { getEnvPath } from 'common/helpers/env.helper'
import * as dotenv from 'dotenv'

dotenv.config({ path: getEnvPath(`${__dirname}/../common/envs`) })

const dataSource = new DataSource(dbConfiguration())
export default dataSource
