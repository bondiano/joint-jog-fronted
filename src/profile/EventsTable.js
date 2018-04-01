import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography, Paper, withStyles, Button, Hidden } from 'material-ui';
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';
import AddIcon from 'material-ui-icons/Add';
import RemoveIcon from 'material-ui-icons/Remove';

import { ProfileStyles } from './ProfileStyles';
import * as eventsActions from '../events/EventsActions';
import { onMap } from "../assets";

class EventsTable extends React.Component {
    static propTypes = {
        unsubscribeEvent: PropTypes.func.isRequired,
        subscribeEvent: PropTypes.func.isRequired,
        events: PropTypes.array.isRequired,
        username: PropTypes.string,
        isCurrentUser: PropTypes.bool.isRequired
    };

    toEvent = (eventId) => {
        this.props.history.push(`/event/${eventId}`);
    };

    subEvent = (eventId) => {
        this.props.subscribeEvent(eventId);

    };

    unsubEvent = (eventId) => {
        this.props.unsubscribeEvent(eventId, null, this.props.username);
    };

    formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();

        return `${day}.${month < 10 ? `0${month}` : month}.${year}`;
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
                                                onClick={() => this.toEvent(ev._id)}
                                                size="small"
                                            >
                                                На карте
                                            </Button>
                                        </Hidden>
                                        <Hidden mdUp>
                                            <Button
                                                variant="fab"
                                                mini
                                                color="primary"
                                                onClick={() => this.toEvent(ev._id)}>
                                                <img src={onMap} alt="On map"/>
                                            </Button>
                                        </Hidden>
                                    </TableCell>
                                    {this.props.isCurrentUser ?
                                        <TableCell padding="none" className={classes.cell}>
                                            <Hidden smDown>
                                                <Button
                                                    variant="raised"
                                                    color="secondary"
                                                    type="submit"
                                                    onClick={() => this.unsubEvent(ev._id)}
                                                    size="small"
                                                >
                                                    Отписаться
                                                </Button>
                                            </Hidden>
                                            <Hidden mdUp>
                                                <Button
                                                    variant="fab"
                                                    mini
                                                    color="secondary"
                                                    onClick={() => this.unsubEvent(ev._id)}>
                                                    <RemoveIcon/>
                                                </Button>
                                            </Hidden>
                                        </TableCell> :
                                        <TableCell padding="none" className={classes.cell}>
                                            <Hidden smDown>
                                                <Button
                                                    variant="raised"
                                                    color="secondary"
                                                    type="submit"
                                                    onClick={() => this.subEvent(ev._id)}
                                                    size="small"

                                                >
                                                    Подписаться
                                                </Button>
                                            </Hidden>
                                            <Hidden mdUp>
                                                <Button
                                                    variant="fab"
                                                    mini
                                                    color="primary"
                                                    onClick={() => this.subEvent(ev._id)}>
                                                    <AddIcon/>
                                                </Button>
                                            </Hidden>
                                        </TableCell>
                                    }
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
    unsubscribeEvent: eventsActions.unsubscribeEventRequest,
    subscribeEvent: eventsActions.subscribeEventRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(ProfileStyles)(EventsTable));

