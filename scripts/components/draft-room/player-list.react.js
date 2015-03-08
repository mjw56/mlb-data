import React from 'react/addons';
import es6shim from 'es6-shim';
import FixedDataTable from 'fixed-data-table';

let PureRenderMixin = React.addons.PureRenderMixin;
let Table = FixedDataTable.Table;
let Column = FixedDataTable.Column;

export default React.createClass({

  mixins: [PureRenderMixin],

  _rowGetter(rowIndex) {
    return this.props.players[rowIndex];
  },

  // TODO: add filtering, search...

  render() {
    
    return (
      <Table
        rowHeight={30}
        rowGetter={this._rowGetter}
        rowsCount={this.props.players.length}
        width={1000}
        height={10000}
        headerHeight={45}>
        <Column
          label="Name"
          width={195}
          dataKey='Name'
        />
        <Column
          label="Position"
          width={70}
          dataKey='Position'
        />
        <Column
          label="Fantasy Points"
          width={85}
          dataKey='FantasyPoints'
        />
        <Column
          label="Games"
          width={70}
          dataKey='Games'
        />
        <Column
          label="Batting Average"
          width={80}
          dataKey='BattingAverage'
        />
        <Column
          label="Home Runs"
          width={70}
          dataKey='HomeRuns'
        />
        <Column
          label="RBI"
          width={70}
          dataKey='Runs'
        />
        <Column
          label="Stolen Bases"
          width={70}
          dataKey='StolenBases'
        />
      </Table>
    );
  }

});
