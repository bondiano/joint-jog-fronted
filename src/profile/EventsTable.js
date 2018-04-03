import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Paper, withStyles, Button, Hidden } from 'material-ui';
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';

import { ProfileStyles } from './ProfileStyles';
import { onMap } from "../assets";
import SubUnsubButton from "./SubUnsubButton";

class EventsTable extends React.Component {
    static propTypes = {
        events: PropTypes.array.isRequired,
        username: PropTypes.string,
        isCurrentUser: PropTypes.bool.isRequired,
        history: PropTypes.object.isRequired,
        classes: PropTypes.object.isRequired
    };

    toEvent = (eventId) => (e) => {
        this.props.history.push(`/event/${eventId}`);
    };

    formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();

        return `${day}.${month < 9 ? `0${month+1}` : month+1}.${year}`;
    };

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.rootTable}>
                <Typography className={classes.heading} variant="headline" component="h2">Пробежки</Typography>
                <Table className={classes.table}>
                    <TableBody>
                        {this.props.events.map(ev => {
                            return (
                                <TableRow key={ev._id}>
                                    <TableCell padding="none" className={classes.cell}>{ev.title}</TableCell>
                                    <TableCell padding="none" className={classes.cell}>{this.formatDate(new Date(ev.date))}</TableCell>
                                    <TableCell padding="none" className={classes.cell}>
                                        <Hidden smDown>
                                            <Button
                                                variant="raised"
                                                color="primary"
                                                onClick={this.toEvent(ev._id)}
                                                size="small">
                                                На карте
                                            </Button>
                                        </Hidden>
                                        <Hidden mdUp>
                                            <Button
                                                variant="fab"
                                                mini
                                                color="primary"
                                                onClick={this.toEvent(ev._id)}>
                                                <img src={onMap} alt="On map"/>
                                            </Button>
                                        </Hidden>
                                    </TableCell>
                                    <TableCell padding="none" className={classes.cell}>
                                        <SubUnsubButton
                                            isCurrentUser={this.props.isCurrentUser}
                                            eventId={ev._id}
                                            eventSubscribers={ev.subscribers}
                                            username={this.props.username}
                                        />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default withStyles(ProfileStyles)(EventsTable);

