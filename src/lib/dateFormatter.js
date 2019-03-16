export default function(date){
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-IN', options);
}
