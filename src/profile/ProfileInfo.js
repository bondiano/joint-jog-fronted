import React from 'react';
import PropTypes from 'prop-types'
import { Typography, Card, withStyles, Input, Button, TextField } from 'material-ui';

import { vk, tw, fb } from '../assets';

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3,
        // overflowX: 'auto',
        display: 'flex',
        //flexWrap: 'nowrap',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 700,
    },
    buttonLine:{
        margin: 16
    },
});

const socialNetworks = {
    vk: (url) => <a href={url}><img src={vk} alt="vk"/></a>,
    facebook: (url) => <a href={url}><img src={fb} alt="fb"/></a>,
    twitter: (url) => <a href={url}><img src={tw} alt="tw"/></a>
};

class ProfileInfo extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        data: PropTypes.object.isRequired,
        isCurrentUser: PropTypes.bool.isRequired,
        changeFormType: PropTypes.func
    };

    render() {
        const {classes} = this.props;
        console.log(this.props.profile);
        return (
            <Card className={classes.root}>
                <div>
                    <Typography className={classes.heading} variant="headline" component="h2">Профиль</Typography>
                </div>

                <div>
                    <TextField
                        label={this.props.data.username}
                        type="text"
                        margin="normal"
                        disabled
                    />
                </div>

                <div>
                    <TextField
                        label={this.props.data.firstName}
                        type="text"
                        margin="normal"
                        disabled
                    />
                </div>

                <div>
                    <TextField
                        label={this.props.data.lastName}
                        type="text"
                        margin="normal"
                        disabled
                    />
                </div>


                <div>
                    <Input
                        defaultValue={this.props.profile.firstName}
                        disabled
                    />
                    <Typography>Имя</Typography>
                </div>
                <div>
                    <Input
                        defaultValue={this.props.data.lastName}
                        disabled
                    />
                    <Typography>Фамилия</Typography>
                </div>
                <div>
                    {this.props.data.sex === 'female' && <Input
                        defaultValue='женский'
                        disabled
                    />}
                    {this.props.data.sex === 'male' && <Input
                        defaultValue='мужской'
                        disabled
                    />}
                    <Typography>Пол</Typography>
                </div>
                <div>
                    <Input
                        defaultValue={this.props.data.age}
                        disabled
                    />
                    <Typography>Возраст</Typography>
                </div>

                <div>
                    {this.props.profile.socialNetworks && this.props.profile.socialNetworks.map((sc) => socialNetworks[sc.type](sc.url))}
                </div>


                {this.props.isCurrentUser && <div>
                    <Button
                        variant="raised"
                        color="primary"
                        type="submit"
                        className={classes.buttonLine}
                        onClick={this.props.changeFormType}
                    >
                        Редактировать
                    </Button>
                </div>}

            </Card>
        );
    }
}


export default withStyles(styles)(ProfileInfo);


