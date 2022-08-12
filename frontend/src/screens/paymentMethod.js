import React from 'react'
import { Button } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import CheckSteps from '../Component/CheckSteps'

function paymentMethod() {

  return (
      <>
      
    <CheckSteps step1 step2 step3 ></CheckSteps>
    <div className='container small-container'>
        <Helmet>
            <title>Payment Method</title>
        </Helmet>
        <h1 className='my-3'>Payment Method</h1>
        <Form onSubmit = {handelSubmit}>
        <div className='mb-3'>
        <Form.Check
            value='paypal'
            type="radio"
            label="paypal"
            id="paypal"
            checked={paymentMethodName === 'paypal'}
            onChange={(e)=>setPaymentMethod(e.target.value)}
          />
          </div>
          <div className='mb-3'>
            <Form.Check
            value='stripe'
            type="radio"
            label="stripe"
            id="stripe"
            checked={paymentMethodName === 'stripe'}
            onChange={(e)=>setPaymentMethod(e.target.value)}
          />
          </div>
          <div className='mb-3'>
              <Button type='submit'>Continue</Button>
          </div>
        </Form>
    </div>
    </>
  )
}

export default paymentMethod