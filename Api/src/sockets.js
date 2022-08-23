const { userJoin, getGameUsers, leaveRoom } = require("./utilsSockets/rooms");
const { joinChat, leaveChat, getUser } = require("./utilsSockets/chats.js");

module.exports = (io) => {
	io.on("connection", (socket) => {
		//funcionalidad sala y match
		socket.on("joinRoom", (user) => {
			if (user.username) {
				let userFull = { ...user, socketid: socket.id };
				global[socket.id] = userFull;
				userJoin(userFull);
				socket.join(userFull.game);
				io.to(userFull.game).emit("gameUsers", getGameUsers(userFull.game));
			}
		});

		socket.on("leaveRoom", (user) => {
			try {
				if (user.username) {
					leaveRoom(user.game, user._id);
					io.to(user.game).emit("gameUsers", getGameUsers(user.game));
				}
			} catch (e) {
				console.log(e.message);
			}
		});

		socket.on("client: invitation", (invitation) =>
			socket.to(invitation.socketid).emit("server: invitation", invitation)
		);

		socket.on("client: invitationAccepted", (invitationAccepted) => {
			// the object contains {userThatAccepted, userThatInvited}
			socket
				.to(invitationAccepted.userThatInvited.socketid)
				.emit("server: invitationAccepted", invitationAccepted.userThatAccepted);
		});

		//funcionalidad chat
		socket.on("joinChat", (user) => {
			let userFull = { ...user, socketid: socket.id };
			global[socket.id] = userFull;
			joinChat(userFull);
		});

		socket.on("client: send message", (msg) => {
			let receiver = getUser(msg.users[1]);
			if (receiver) {
				socket.to(receiver.socketid).emit("server: received message", msg);
			}
		});

		//

		socket.on("disconnect", () => {
			// functionalidad sala y match
			if (global[socket.id]) {
				leaveRoom(global[socket.id].game, global[socket.id]._id);
				io.to(global[socket.id].game).emit(
					"gameUsers",
					getGameUsers(global[socket.id].game)
				);
				global[socket.id] = null;
				delete global[socket.id];
			}

			//funcionalidad chat
			if (global[socket.id]) {
				leaveChat(global[socket.id]._id);
				global[socket.id] = null;
				delete global[socket.id];
			}
		});
	});
};
