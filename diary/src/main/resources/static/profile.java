package static;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.JButton;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.ImageIcon;
import java.io.File;

public class Profile {
    public static void main(String[] args) {
        JFrame frame = new JFrame("Profile Image Changer");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(400, 400);

        JLabel profileImage = new JLabel();
        profileImage.setBounds(100, 100, 200, 200);

        JButton changeProfileButton = new JButton("Change Profile Image");
        changeProfileButton.setBounds(100, 50, 200, 30);

        changeProfileButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                JFileChooser fileChooser = new JFileChooser();
                int returnValue = fileChooser.showOpenDialog(null);

                if (returnValue == JFileChooser.APPROVE_OPTION) {
                    File file = fileChooser.getSelectedFile();
                    ImageIcon imageIcon = new ImageIcon(file.getAbsolutePath());
                    profileImage.setIcon(imageIcon);
                }
            }
        });

        frame.add(profileImage);
        frame.add(changeProfileButton);

        frame.setLayout(null);
        frame.setVisible(true);
    }
}

