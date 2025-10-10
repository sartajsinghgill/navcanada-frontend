import dayjs from "dayjs"

export function Result({ result, index }) {

    const text = JSON.parse(result.text).raw;
    const textPart1 = text.substring(0, text.indexOf("Q)"));
    const textPart2 = text.substring(text.indexOf(" A)"), text.length);
    return (
        <tr>
            <th scope="row">{index + 1}</th>
            <td>{result.location}</td>
            <td>{result.startValidity && dayjs(result.startValidity).format('MMMM D')}</td>
            <td>{result.endValidity && dayjs(result.endValidity).format('MMMM D')}</td>
            <td>{textPart1 + textPart2}</td>
        </tr>
    )
}