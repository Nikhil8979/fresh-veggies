import React from "react";
import {useState} from "react";
import {Grid,
    Paper,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
    InputLabel,
    TextField,
    Checkbox,
    Button,
    Divider,
    MenuItem} from "@material-ui/core";
import {ReactStateDeclaration} from "@uirouter/react";
import {KeyboardDatePicker} from "@material-ui/pickers";

export function AddPromo (){
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return <Grid className="p-4">
        <Grid container>
            <Grid item xs>
                <Typography variant="h5" className="font-weight-normal">Add Promo</Typography>
            </Grid>
        </Grid>
        <Grid container component={Paper} className="p-3 mt-3">
            <Grid container>
                <Grid item xs>
                    <RadioGroup className="d-flex flex-row">
                        <FormControlLabel
                            value="FOR_ALL_USER" control={<Radio color="primary"/>}
                            label="For All Users"
                        />
                        <FormControlLabel
                            value="FOR_FIRST_TIME_USER" control={<Radio color="primary"/>}
                            label="For First Time User Only"
                        />
                    </RadioGroup>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs>
                    <InputLabel required className="font-weight-bold">
                        Promo Code Name
                    </InputLabel>
                    <TextField
                        size="medium" fullWidth variant="outlined" placeholder="Promo Code Name"
                        color="primary"
                    />
                </Grid>
                <Grid item xs>
                    <InputLabel required className="font-weight-bold">
                        Promo Code Description
                    </InputLabel>
                    <TextField
                        size="medium" fullWidth variant="outlined" placeholder="Promo Code Description"
                        color="primary"
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} className="mt-2">
                <Grid item xs>
                    <InputLabel required className="font-weight-bold">
                        Choose Discount Type
                    </InputLabel>
                    <TextField value="any" variant="outlined" select color="primary" fullWidth size="medium">
                        <MenuItem value="any">Select Discount Type</MenuItem>
                        <MenuItem value="percent">%</MenuItem>
                        <MenuItem value="flat">Flat</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs>
                    <InputLabel required className="font-weight-bold">
                        Promo Code Discount
                    </InputLabel>
                    <TextField
                        type="number" fullWidth variant="outlined" size="medium" color="primary"
                        placeholder="Discount"
                    />
                </Grid>
                <Grid item xs>
                    <InputLabel required className="font-weight-bold">
                        Minimum Order Value
                    </InputLabel>
                    <TextField
                        type="number" fullWidth variant="outlined" size="medium" color="primary"
                        placeholder="Minimum Order Value"
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} className="mt-2">
                <Grid item xs>
                    <InputLabel required className="font-weight-bold">
                        Total No. of Vouchers
                    </InputLabel>
                    <TextField
                        type="number" fullWidth variant="outlined" size="medium" color="primary"
                        placeholder="Total No. of Vouchers"
                    />
                </Grid>
                <Grid item xs>
                    <InputLabel required className="font-weight-bold">
                        Total Redeem Allowed(Per User)
                    </InputLabel>
                    <TextField
                        type="number" fullWidth variant="outlined" size="medium" color="primary"
                        placeholder="Total No. of Vouchers"
                    />
                </Grid>

                <Grid item xs>
                    <InputLabel required className="font-weight-bold">
                        Promo Code Validity
                    </InputLabel>
                    <TextField
                        type="number" fullWidth variant="outlined" size="medium" color="primary"
                        placeholder="Promo Code Validity"
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} className="mt-2">
                <Grid item xs={12} sm={4} md={4} lg={4}>
                    <InputLabel className="font-weight-bold">Promo Code Validity Starts</InputLabel>
                    <KeyboardDatePicker
                        autoOk
                        fullWidth
                        size="medium"
                        variant="inline"
                        inputVariant="outlined"
                        format="MM-DD-YYYY"
                        value={selectedDate}
                        onChange={handleDateChange}
                        label="From Date"
                    />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                    <InputLabel className="font-weight-bold">Promo Code Validity End</InputLabel>
                    <KeyboardDatePicker
                        autoOk
                        fullWidth
                        size="medium"
                        variant="inline"
                        inputVariant="outlined"
                        format="MM-DD-YYYY"
                        value={selectedDate}
                        onChange={handleDateChange}
                        label="From Date"
                    />
                </Grid>
            </Grid>

            <Grid container className="mt-3">
                <Grid item component={Paper} direction="column" xs={12} sm={4} lg={4} md={4}>
                    <Grid className="p-1 d-flex justify-content-between align-items-center">
                        <Typography variant="h6" className="font-weight-bold">Categories</Typography>
                        <FormControlLabel
                            control={<Checkbox color="primary"/>}
                            label="Mark All"
                        />
                    </Grid>
                    <Grid item xs>
                        <Divider/>
                    </Grid>
                    <Grid item xs className="p-2 d-flex justify-content-between align-items-center">
                        <InputLabel className="font-weight-bold">Fruits</InputLabel>
                        <Checkbox color="primary"/>
                    </Grid>
                    <Grid item xs className="p-2 d-flex justify-content-between align-items-center">
                        <InputLabel className="font-weight-bold">Vegetables</InputLabel>
                        <Checkbox color="primary"/>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container className="mt-3">
                <Grid item xs className="d-flex justify-content-end align-items-center">
                    <Button className="text-white" color="primary" variant="contained">Submit</Button>
                </Grid>
            </Grid>
        </Grid>
    </Grid>;
}

export const states: ReactStateDeclaration[] = [
    {
        name: "addPromo",
        url: "/add-promotion",
        component: AddPromo
    }
];
