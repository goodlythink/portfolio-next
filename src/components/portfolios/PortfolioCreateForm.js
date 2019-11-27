import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'reactstrap';
import PortInput from '../form/PortInput'
import PortDate from '../form/PortDate'

const validateInput = (values) => {
    let errors = {};

    Object.entries(values).forEach(([key, value]) => {
        if (!values[key] && values[key] === 'startDate' || values[key] === 'endDate') {
            errors[key] = `Field ${key} is required`
        }
    })

    const startDate = values.startDate;
    const endDate = values.endDate;

    if (startDate && endDate && endDate.isBefore(startDate)) {
        errors.endDate = 'EndDate cannot before StartDate'
    }
    return errors;
}

const INITIAL_VALUES = { title: '', company: '', location: '', position: '', description: '', startDate: '', endDate: '' }
const PortfolioCreateForm = (props) => (
    <div>
        <Formik
            initialValues={INITIAL_VALUES}
            validate={validateInput}
            onSubmit={props.onSubmit}
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
                        component={PortDate} />

                    <Field name="endDate"
                        label="EndDate"
                        canBeDisabled={true}
                        component={PortDate} />

                    <Button color="success" size="lg" disabled={isSubmitting}>Create</Button>
                </Form>
            )}
        </Formik>
    </div>
);

export default PortfolioCreateForm;

// import React from 'react'

// export default class PortfolioCreateForm extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { title: '', description: '', language: '' };

//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     handleChange(event) {
//         const field = event.target.name
//         this.setState({ [field]: event.target.value });
//     }

//     handleSubmit(event) {
//         alert('A name was submitted: ' + this.state.value + ' ' + this.state.description + ' ' + this.state.language);
//         event.preventDefault();
//     }

//     render() {
//         return (
//             <form onSubmit={this.handleSubmit}>
//                 <Label>
//                     Name:
//                     <input name="title" type="text" value={this.state.value} onChange={this.handleChange} />
//                 </Label>
//                 <Label>
//                     Description:
//                     <input name="description" type="text" value={this.state.description} onChange={this.handleChange} />
//                 </Label>
//                 <Label>
//                     Pick your favorite flavor:
//                     <select name="language" value={this.state.language} onChange={this.handleChange}>
//                         <option value="javascript">javascript</option>
//                         <option value="java">java</option>
//                         <option value="c++">c++</option>
//                         <option value="c# ">c#</option>
//                     </select>
//                 </Label>
//                 <input type="submit" value="Submit" />
//             </form>
//         );
//     }
// }