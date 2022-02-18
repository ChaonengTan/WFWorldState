import { useQuery } from '@apollo/client'
import GetWorldState from '../../functions/queries/WorldStateQuery'
import parseTime from '../parseTime';
import '../WFWorldState/WFWorldState.css'
import '../PlainsOfEidelon/PlainsOfEidelon.css';

export default function CambionDrift() {
    const { data } = useQuery(
        GetWorldState,
        { 
          variables: { location: 'cambionCycle'},
          pollInterval: 1000
        }
    )
    return (
        <div>
            {data ?
            <div className="wfWorldState worldState">
                <div className='cambion'>
                    <div>Cambion Drift | {data.getWorldstate.state}</div>
                    {parseTime(data.getWorldstate.timeLeft)}
                </div>
            </div> :
            <div className='loading'>Fetching Data</div>
            }
        </div>
    );
}

