import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Alert } from 'reactstrap';
import PortInput from '../form/PortInput'
import PortDate from '../form/PortDate'

import moment from 'moment'

const validateInput = (values) => {
    let errors = {};
    // debugger;
    Object.entries(values).forEach(([key, value]) => {
        if (!values[key] && key !== 'endDate') {
            errors[key] = `Field ${key} is required`
        }
    })

    const startDate = moment(values.startDate);
    const endDate = moment(values.endDate);

    if (startDate && endDate && endDate.isBefore(startDate)) {
        errors.endDate = 'EndDate cannot before StartDate'
    }
    return errors;
}


const PortfolioCreateForm = ({ initialValues, onSubmit, error }) => (
    <div>
        <Formik
            initialValues={initialValues}
            validate={validateInput}
            onSubmit={onSubmit}
        >
            {({ isSubmitting }) => (
                <Form>

                    <Field type="text"
                        name="title"
                        label="Title"
                        component={PortInput} />

                    <Field type="text"
                        name="company"
                        label="Company"
                        component={PortInput} />

                    <Field type="text"
                        name="location"
                        label="Location"
                        component={PortInput} />

                    <Field type="text"
                        name="position"
                        label="Position"
                        component={PortInput} />

                    <Field type="text"
                        name="description"
                        label="Description"
                        component={PortInput} />


                    <Field name="startDate"
                        label="StartDate"
                        initialDate={initialValues.startDate}
                        component={PortDate} />

                    <Field name="endDate"
                        label="EndDate"
                        canBeDisabled={true}
                        initialDate={initialValues.endDate}
                        component={PortDate} />
                    {error &&
                        <Alert color="danger">
                            {error}
                        </Alert>
                    }
                    <Button type="submit" color="success" size="lg" disabled={isSubmitting}>Create</Button>
                </Form>
            )}
        </Formik>
    </div>
);

export default PortfolioCreateForm;