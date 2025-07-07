import Contact from "../models/contact.js"

export const handleContact = async (req, res) => {
  const { first_name, last_name, email, message } = req.body;

  if (!first_name || !last_name || !email || !message) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' })
  }

  try {
    const newMessage = new Contact({
      first_name,
      last_name,
      email,
      message
    });

    await newMessage.save();
    res.status(200).json({ message: 'Message enregistré avec succès.' });
  } catch (err) {
    console.error("Erreur lors de l'enregistrement du message :", err);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
}