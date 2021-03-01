import express from 'express'

const app = express()

export const getApp = (): express.Express => app
