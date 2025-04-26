module.exports = {
    eq: function (a, b) {
        return a === b;
    },
    // Exemplo de outro helper
    formatDate: function (date) {
        if (!date) return "";
        return new Date(date).toLocaleDateString("pt-BR"); // "27/03/2025"
    },
    formatDateISO: function (date) {
        if (!date) return "";
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`; // formato ISO para input type="date"
    }
};