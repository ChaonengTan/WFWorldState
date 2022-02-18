import { useQuery } from '@apollo/client'
import GetWorldState from '../../functions/queries/WorldStateQuery'
import parseTime from '../parseTime';
import '../WFWorldState/WFWorldState.css'
import './PlainsOfEidelon.css';

function PlainsOfEidelon() {
    const { data: earthData } = useQuery(GetWorldState, { variables: { location: 'earthCycle'}, pollInterval: 1000 })
    const { data: cetusData } = useQuery(GetWorldState, { variables: { location: 'cetusCycle'}, pollInterval: 1000 })
    return (
        <div>
            {earthData && cetusData ?
            <div className="wfWorldState worldState">
                <div className='earth'>
                    <div>
                        <div>Earth | {earthData.getWorldstate.state}</div>
                        {parseTime(earthData.getWorldstate.timeLeft)}
                    </div>
                    <div>
                        <div>Cetus | {cetusData.getWorldstate.state}</div>
                        {parseTime(cetusData.getWorldstate.timeLeft)}
                    </div>
                </div>
            </div> :
            <div className='loading'>Fetching Data</div>
            }
        </div>
    );
}

export default PlainsOfEidelon;
