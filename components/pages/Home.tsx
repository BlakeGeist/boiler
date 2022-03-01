import React, { FC } from 'react'
import axios from 'axios';
import Button from '@mui/material/Button'
import Layout from '../Layout'
import getDividends from 'utils/getDividinds';

const Home:FC = ({ companies }) => {
  const onSubmit = async (e) => {
    e.preventDefault()
    const info = await getDividends(e.currentTarget.symbol.value)
    console.log(info);
  }

  return (
    <Layout>
      <>
        <h2>This is the main content</h2>
        <table>
          <tbody>
            {
              companies?.results.map(company => {
                const click = async (e) => {
                  e.preventDefault()
                  const dividenInfo = await getDividends(company.symbol);
                  console.log(dividenInfo)
                }

                return (
                  <tr key={company.symbol}>
                    <td>{company.symbol}</td>
                    <td>{company.companyName}</td>
                    <td>{company.industryOrCategory}</td>
                    <td>
                      <Button onClick={click}>Get Info</Button></td>
                  </tr>
                )}
              )

            }
          </tbody>
        </table>
      </>
    </Layout>
  )
}

export default Home
