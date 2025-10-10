import { useEffect, useState } from "react"
import { Result } from "./Result";
import './Information.css'

export function Information({ response }) {

    const [results, setResults] = useState([]);

    useEffect(() => {
        if (response.count > 0) {
            setResults(response.results);
        }
    }, [response])

    return (
        <div className="table-responsive">
            <table className="table table-striped search-results">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Airport Code</th>
                        <th scope="col">Start Validity</th>
                        <th scope="col">End Validity</th>
                        <th scope="col">Data</th>
                    </tr>
                </thead>
                <tbody>
                    {results.length > 0 ? (
                        results.map((result, index) => (
                            <Result
                                key={result.pk}
                                result={result}
                                index={index}
                            />

                        ))
                    ) : (
                        <tr><td colSpan="5">Please select an airport location</td></tr>
                    )}
                </tbody>
            </table >
        </div>
    )
}